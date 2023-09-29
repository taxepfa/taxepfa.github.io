'use client';

import { useEffect } from 'react';
import { LOCAL_STORAGE_STATE_KEY } from '~/lib/config';
import { State, state } from '~/lib/state';

export function StateLoader() {
  useEffect(() => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (serializedState) {
        const newState = JSON.parse(serializedState);
        for (const key in newState) {
          state[key as keyof State] = newState[key];
        }
      }
    } catch (err) {
      // just log the error for now
      console.error(err);
    }
  }, []);

  return null;
}
