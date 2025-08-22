import React, { useState } from 'react';
import { Table, TableColumn } from './Table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface UserRecord {
  key: string;
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  role: string;
  joinDate: string;
}

const mockData: UserRecord[] = [
  {
    key: '1',
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 32,
    address: '123 Main St, New York, NY',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'Admin',
    joinDate: '2023-01-15',
  },
  {
    key: '2',
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    age: 28,
    address: '456 Oak Ave, Los Angeles, CA',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b9a40d?w=40&h=40&fit=crop&crop=face',
    role: 'User',
    joinDate: '2023-02-20',
  },
  {
    key: '3',
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    age: 45,
    address: '789 Pine Rd, Chicago, IL',
    status: 'inactive',
    role: 'User',
    joinDate: '2022-11-10',
  },
  {
    key: '4',
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    age: 35,
    address: '321 Elm St, Houston, TX',
    status: 'pending',
    role: 'Moderator',
    joinDate: '2023-03-05',
  },
  {
    key: '5',
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    age: 29,
    address: '654 Maple Dr, Phoenix, AZ',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    role: 'User',
    joinDate: '2023-01-28',
  },
];

export const TableDemo: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(false);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-chart-2';
      case 'inactive':
        return 'text-muted-foreground';
      case 'pending':
        return 'text-chart-3';
      default:
        return 'text-foreground';
    }
  };

  const columns: TableColumn[] = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: UserRecord) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={record.avatar} alt={record.name} />
            <AvatarFallback className="text-sm">
              {record.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => (
        <span className={`capitalize font-semibold ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 120,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      align: 'center',
      render: (_, record: UserRecord) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleSelectionChange = (selectedKeys: (string | number)[], selectedRows: UserRecord[]) => {
    setSelectedRowKeys(selectedKeys);
    console.log('Selected:', selectedKeys, selectedRows);
  };

  const handleLoadingToggle = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4">Standard Table Component</h2>
        <p className="text-muted-foreground mb-6">
          A standardized table component following Ant Design API patterns with our design system styling.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <Button onClick={handleLoadingToggle} variant="outline">
          Test Loading State
        </Button>
        <Button 
          onClick={() => setSelectedRowKeys([])} 
          variant="outline"
          disabled={selectedRowKeys.length === 0}
        >
          Clear Selection ({selectedRowKeys.length})
        </Button>
      </div>

      <div className="space-y-8">
        {/* Basic Table */}
        <div>
          <h4 className="mb-4">Basic Table with Row Selection</h4>
          <Table
            dataSource={mockData}
            columns={columns}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectionChange,
            }}
            onRow={(record) => ({
              onClick: () => console.log('Row clicked:', record),
            })}
          />
        </div>

        {/* Compact Table */}
        <div>
          <h4 className="mb-4">Compact Size Table</h4>
          <Table
            dataSource={mockData.slice(0, 3)}
            columns={columns.slice(0, 4)}
            size="small"
            bordered
          />
        </div>

        {/* Simple Text Table */}
        <div>
          <h4 className="mb-4">Simple Table (Like Ant Design Example)</h4>
          <Table
            dataSource={[
              {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
              },
              {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
              },
            ]}
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
              },
              {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
              },
            ]}
          />
        </div>

        {/* Empty State */}
        <div>
          <h4 className="mb-4">Empty State</h4>
          <Table
            dataSource={[]}
            columns={columns.slice(0, 3)}
          />
        </div>
      </div>
    </div>
  );
};

export default TableDemo;