'use client';

import { Row, Col } from 'antd';
import { StatCard } from '../../../components/dashboard/StatCard';
import { ChartCard } from '../../../components/dashboard/ChartCard';
import { TodoList } from '../../../components/dashboard/TodoList';

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row gutter={16}>
        <Col span={6}>
          <StatCard title="用户总数" value={10000} />
        </Col>
        <Col span={6}>
          <StatCard title="帖子总数" value={5200} />
        </Col>
        <Col span={6}>
          <StatCard title="待审核" value={32} />
        </Col>
        <Col span={6}>
          <StatCard title="今日新增" value={180} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ChartCard title="用户增长趋势" />
        </Col>
        <Col span={12}>
          <ChartCard title="帖子发布趋势" />
        </Col>
      </Row>
      <TodoList items={['审核新帖子', '处理举报内容', '更新服务器配置']} />
    </div>
  );
}
