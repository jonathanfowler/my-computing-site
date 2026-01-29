const STORAGE_KEY = "fsc_progress_v1";

const loadState = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return { attempts: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : { attempts: [] };
  } catch (error) {
    return { attempts: [] };
  }
};

const saveState = (state) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore storage failures (quota, disabled storage, etc.).
  }
};

export const recordAttempt = (result) => {
  if (!result || !result.activityId) {
    return;
  }

  const state = loadState();
  const attempt = {
    attemptId: result.attemptId || crypto.randomUUID?.() || Date.now().toString(),
    activityId: result.activityId,
    blockId: result.blockId ?? null,
    blockType: result.blockType ?? null,
    score: result.score ?? null,
    timeSpent: result.timeSpent ?? null,
    answers: result.answers ?? null,
    perSkill: result.perSkill ?? null,
    completedAt: result.completedAt || new Date().toISOString(),
  };

  state.attempts = [...(state.attempts || []), attempt];
  saveState(state);
};

export const getAttemptsForActivity = (activityId) => {
  const state = loadState();
  return (state.attempts || []).filter(
    (attempt) => attempt.activityId === activityId
  );
};

export const getLatestAttempt = (activityId) => {
  const attempts = getAttemptsForActivity(activityId);
  return attempts.length ? attempts[attempts.length - 1] : null;
};

export const clearProgress = () => {
  saveState({ attempts: [] });
};
