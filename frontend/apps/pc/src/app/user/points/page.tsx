'use client';

import { useQuery } from '@tanstack/react-query';
import { pointsService } from '../../../services';
import { PointsRecord } from '../../../components/user/PointsRecord';

export default function UserPoints() {
  const { data } = useQuery({
    queryKey: ['points'],
    queryFn: () => pointsService.getRecords({ page: 1, pageSize: 20 }),
  });

  const records = data?.data.data.list ?? [];

  return <PointsRecord records={records} />;
}
