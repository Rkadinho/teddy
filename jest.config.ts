import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
});
