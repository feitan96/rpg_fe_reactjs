import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import AppButton from '../button/button';

interface SpriteUploadProps {
  onUploadSuccess: (filePath: string) => void;
  characterId?: number;
  defaultImageUrl?: string;
}

const SpriteUpload: React.FC<SpriteUploadProps> = ({
  onUploadSuccess,
  characterId,
  defaultImageUrl
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultImageUrl);

  // Base URL for API requests
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  const uploadProps: UploadProps = {
    accept: '.svg',
    beforeUpload: (file) => {
      const isSvg = file.type === 'image/svg+xml';
      if (!isSvg) {
        message.error('You can only upload SVG file!');
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }

      return true;
    },
    fileList,
    onChange: ({ fileList }) => {
      // Limit to only one file
      const limitedFileList = fileList.slice(-1);
      setFileList(limitedFileList);
    },
    onRemove: () => {
      setFileList([]);
      setPreviewUrl(undefined);
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('file', file);

      setUploading(true);

      try {
        let url = '';
        if (characterId) {
          // If characterId is provided, update the character's sprite
          url = `${apiBaseUrl}/api/v1/characters/${characterId}/sprite`;
        } else {
          // Otherwise, just upload the file
          url = `${apiBaseUrl}/api/v1/files/upload`;
        }

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response formats
        let filePath;
        if (characterId) {
          // When updating character sprite directly, get the path from the response
          filePath = data.spritePath;
          // Ensure it doesn't have the base URL
          if (filePath && filePath.startsWith(apiBaseUrl)) {
            filePath = filePath.substring(apiBaseUrl.length);
          }
        } else {
          // When using the generic file upload endpoint
          const fileUrl = data.fileUrl;
          const fileName = fileUrl.split('/').pop();
          filePath = `/uploads/${fileName}`;
        }

        // Passes only the relative path to parent component
        onUploadSuccess(filePath);

        // Create a preview URL
        setPreviewUrl(`${apiBaseUrl}${filePath}`);
        message.success('Sprite uploaded successfully');

        if (onSuccess) {
          onSuccess({});
        }
      } catch (error) {
        message.error('Sprite upload failed');
        if (onError) {
          onError(new Error('Upload failed'));
        }
      } finally {
        setUploading(false);
      }
    },
  };

  return (
    <div>
      <Upload {...uploadProps} maxCount={1} listType="picture">
        <AppButton icon={<UploadOutlined />} loading={uploading}>
          {uploading ? 'Uploading' : 'Upload Sprite (SVG only)'}
        </AppButton>
      </Upload>

      {previewUrl && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <img
            src={previewUrl}
            alt="Sprite Preview"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default SpriteUpload;