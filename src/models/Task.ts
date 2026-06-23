export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Alta' | 'Media' | 'Baja';
  date: string;
  completed: boolean;
}