import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAsync, usePromise } from '../async';
import { nextTick } from 'vue';

describe('Async Hooks', () => {
  describe('useAsync', () => {
    it('should manage loading state', async () => {
      const mockFn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
      const { loading, execute } = useAsync(mockFn);

      expect(loading.value).toBe(false);
      
      const promise = execute();
      expect(loading.value).toBe(true);
      
      await promise;
      expect(loading.value).toBe(false);
    });

    it('should update data on success', async () => {
      const mockFn = vi.fn().mockResolvedValue('test');
      const { data, execute } = useAsync(mockFn);
      
      await execute();
      expect(data.value).toBe('test');
    });

    it('should update error on failure', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('fail'));
      const { error, execute } = useAsync(mockFn);
      
      try {
        await execute();
      } catch (e) {
        // execute handles the error and sets error.value
      }
      expect(error.value).toEqual(new Error('fail'));
    });

    it('should support cancellation', async () => {
      const mockFn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
      const { loading, execute, cancel } = useAsync(mockFn);
      
      execute();
      expect(loading.value).toBe(true);
      
      cancel();
      expect(loading.value).toBe(false);
      // Ensure the promise completion doesn't affect state if cancelled
      await nextTick();
      expect(loading.value).toBe(false);
    });
  });

  describe('usePromise', () => {
    it('should auto-execute and manage state', async () => {
      const mockFn = vi.fn().mockResolvedValue('promise');
      const { loading, data } = usePromise(mockFn);
      
      expect(loading.value).toBe(true);
      
      await nextTick();
      await new Promise(r => setTimeout(r, 0)); // wait for promise resolution
      
      expect(data.value).toBe('promise');
      expect(loading.value).toBe(false);
    });
  });
});
