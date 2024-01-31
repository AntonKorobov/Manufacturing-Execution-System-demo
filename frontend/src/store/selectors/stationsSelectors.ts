import { RootState } from '@/store/store';

export const selectPage = (state: RootState) => state.stations.page;
