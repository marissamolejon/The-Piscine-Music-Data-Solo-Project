import { getMostOften, isFridayNight, calculateLongestStreak, getEveryDaySongs } from './common.mjs';

describe('common.mjs utilities', () => {

  describe('getMostOften', () => {
    test('returns the most frequent item', () => {
      const events = [
        { song_id: 1 },
        { song_id: 2 },
        { song_id: 1 },
        { song_id: 3 },
        { song_id: 1 },
        { song_id: 2 },
      ];
      const result = getMostOften(events, e => e.song_id);
      expect(result).toEqual(["1", 3]); // [key, count]
    });

    test('returns null for empty array', () => {
      expect(getMostOften([], e => e.song_id)).toBeNull();
    });
  });


  describe('isFridayNight', () => {
    test('returns true for Friday after 17:00', () => {
      const fridayEvening = new Date('2026-03-13T18:30:00'); // Friday 18:30
      expect(isFridayNight(fridayEvening)).toBe(true);
    });

    test('returns true for Saturday before 4:00', () => {
      const saturdayEarly = new Date('2026-03-14T03:00:00'); // Saturday 03:00
      expect(isFridayNight(saturdayEarly)).toBe(true);
    });

    test('returns false for Friday before 17:00', () => {
      const fridayMorning = new Date('2026-03-13T10:00:00');
      expect(isFridayNight(fridayMorning)).toBe(false);
    });

    test('returns false for Saturday after 4:00', () => {
      const saturdayMorning = new Date('2026-03-14T05:00:00');
      expect(isFridayNight(saturdayMorning)).toBe(false);
    });
  });


  describe('calculateLongestStreak', () => {
    test('returns the longest consecutive song streak', () => {
      const events = [
        { song_id: 1 },
        { song_id: 1 },
        { song_id: 2 },
        { song_id: 2 },
        { song_id: 2 },
        { song_id: 1 },
      ];
      const result = calculateLongestStreak(events);
      expect(result).toEqual({ id: 2, length: 3 });
    });

    test('returns null for empty events', () => {
      expect(calculateLongestStreak([])).toBeNull();
    });
  });


  describe('getEveryDaySongs', () => {
    test('returns songs played every active day', () => {
      const events = [
        { song_id: 1, timestamp: '2026-03-01T10:00:00' },
        { song_id: 2, timestamp: '2026-03-01T11:00:00' },
        { song_id: 1, timestamp: '2026-03-02T09:00:00' },
        { song_id: 2, timestamp: '2026-03-02T12:00:00' },
        { song_id: 1, timestamp: '2026-03-03T10:00:00' },
      ];
      const result = getEveryDaySongs(events);
      expect(result).toEqual([1]); // Only song_id 1 is played every day
    });

    test('returns empty array if no events', () => {
      expect(getEveryDaySongs([])).toEqual([]);
    });
  });

});
