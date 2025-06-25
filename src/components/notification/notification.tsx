import React from 'react';
import { notification } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
}

const iconMap = {
  success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
  warning: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
  error: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
};

export const showNotification = ({
  type,
  message,
  description = '',
  duration = 4.5
}: NotificationProps) => {
  notification.open({
    message,
    description,
    icon: iconMap[type],
    duration,
    placement: 'topRight'
  });
};

// Convenience methods for common notifications
export const showSuccessNotification = (message: string, description?: string) =>
  showNotification({ type: 'success', message, description });

export const showInfoNotification = (message: string, description?: string) =>
  showNotification({ type: 'info', message, description });

export const showWarningNotification = (message: string, description?: string) =>
  showNotification({ type: 'warning', message, description });

export const showErrorNotification = (message: string, description?: string) =>
  showNotification({ type: 'error', message, description });

// Character specific notification helpers
export const showCharacterCreatedNotification = (characterName: string) =>
  showSuccessNotification(
    'Character Created',
    `${characterName} has been successfully created.`
  );

export const showCharacterUpdatedNotification = (characterName: string) =>
  showSuccessNotification(
    'Character Updated',
    `${characterName} has been successfully updated.`
  );

export const showCharacterDeletedNotification = (characterName: string, isSoftDelete: boolean) =>
  showSuccessNotification(
    'Character Deleted',
    `${characterName} has been ${isSoftDelete ? 'soft' : 'permanently'} deleted.`
  );

export const showCharacterErrorNotification = (operation: string, error: string) =>
  showErrorNotification(
    `Failed to ${operation} character`,
    error || 'An unexpected error occurred.'
  );