'use client';

import { useEffect } from 'react';
import { subscribe } from 'valtio';
import { LOCAL_STORAGE_STATE_KEY } from '~/lib/config';
import { State, initialState, state } from '~/lib/state';

export function StateLoader() {
  useEffect(() => {
    try {
      const serializedStateBackup = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (serializedStateBackup) {
        const stateBackup = JSON.parse(serializedStateBackup) as State & { appVersion: string };

        if (stateBackup.appVersion !== process.env.APP_VERSION) {
          console.info('App version changed, will reset local storage state...');
          localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
          return;
        }

        for (const key in initialState) {
          const val = stateBackup[key as keyof State];
          if (val !== undefined) {
            // @ts-expect-error - We know that the key is valid
            state[key] = val;
          }
        }
      }
    } catch {
      console.warn('Error while trying to load state from local storage, will try to reset it...');
      try {
        localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
      } finally {
        // Do nothing
      }
    }

    const unsubscribe = subscribe(state, () => {
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify({ ...state, appVersion: process.env.APP_VERSION }));
    });

    return unsubscribe;
  }, []);

  return null;
}
