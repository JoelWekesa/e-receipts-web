import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { toast } from '@/components/ui/use-toast';
import dayjs from 'dayjs';
interface Setting {
	store_id?: string;
	token: string
}

export interface AddSetting {
	id: string;
	userId: string;
	storeId: string;
	createdAt: Date;
	updatedAt: Date;
}

const upsertSettings = async ({ store_id, token }: Setting) => {
	const nSetting: AddSetting = await ApiClient(token).post('settings/add', { store_id }).then((res) => res.data);
	return nSetting;
};

const useUpsertSettings = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: upsertSettings,
		onSuccess: (data) => {
			toast({
				title: 'Default store successfully updated',
				description: dayjs(data?.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
			});

			queryClient.invalidateQueries({
				queryKey: ['setting', data?.id],
			});
		},
	});
};

export default useUpsertSettings;
