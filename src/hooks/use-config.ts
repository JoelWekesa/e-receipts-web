import { Style } from '@/components/styles';
import { Theme } from '@/components/themes';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type Config = {
	style: Style['name'];
	theme: Theme['name'];
	radius: number;
};

const configAtom = atomWithStorage<Config>('config', {
	style: 'new-york',
	theme: 'zinc',
	radius: 0.5,
});

export function useConfig() {
	return useAtom(configAtom);
}
