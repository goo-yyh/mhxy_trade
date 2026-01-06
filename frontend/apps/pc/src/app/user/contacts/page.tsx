'use client';

import { useQuery } from '@tanstack/react-query';
import { List, Card } from 'antd';
import { contactService } from '../../../services';

export default function UserContacts() {
  const { data } = useQuery({
    queryKey: ['contacts', 'sent'],
    queryFn: () => contactService.getSent({ page: 1, pageSize: 20 }),
  });

  const requests = data?.data.data.list ?? [];

  return (
    <Card title="联系方式申请">
      <List
        dataSource={requests}
        renderItem={(item) => (
          <List.Item>
            {item.post.title} - {item.auditStatus}
          </List.Item>
        )}
      />
    </Card>
  );
}
