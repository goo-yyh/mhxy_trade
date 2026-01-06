import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CapsuleTabs, List, Button, Toast } from 'antd-mobile';
import { contactService } from '../../services';
import { Header } from '../../components/common/Header';

export function ContactRequests() {
  const queryClient = useQueryClient();
  const sentQuery = useQuery({
    queryKey: ['contacts', 'sent'],
    queryFn: () => contactService.getSent({ page: 1, pageSize: 20 }),
  });
  const receivedQuery = useQuery({
    queryKey: ['contacts', 'received'],
    queryFn: () => contactService.getReceived({ page: 1, pageSize: 20 }),
  });

  const sent = sentQuery.data?.data.data.list ?? [];
  const received = receivedQuery.data?.data.data.list ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['contacts'] });

  return (
    <div>
      <Header title="联系方式申请" back />
      <CapsuleTabs>
        <CapsuleTabs.Tab title="我发出的" key="sent">
          <List>
            {sent.map((item) => (
              <List.Item key={item.id} description={item.message}>
                {item.post.title}
              </List.Item>
            ))}
          </List>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="我收到的" key="received">
          <List>
            {received.map((item) => (
              <List.Item
                key={item.id}
                description={item.message}
                extra={
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                      size="mini"
                      color="primary"
                      onClick={async () => {
                        await contactService.handle(item.id, { action: 'approve' });
                        Toast.show('已同意');
                        refresh();
                      }}
                    >
                      同意
                    </Button>
                    <Button
                      size="mini"
                      color="danger"
                      onClick={async () => {
                        await contactService.handle(item.id, {
                          action: 'reject',
                          reason: '暂不方便',
                        });
                        Toast.show('已拒绝');
                        refresh();
                      }}
                    >
                      拒绝
                    </Button>
                  </div>
                }
              >
                {item.requester.nickname}
              </List.Item>
            ))}
          </List>
        </CapsuleTabs.Tab>
      </CapsuleTabs>
    </div>
  );
}
