import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, InputNumber } from 'antd';
import AppInput from '../../../components/input/input';
import AppButton from '../../../components/button/button';
import SpriteUpload from '../../../components/upload/sprite-upload';
import type { Character } from '../types/character';
import { CharacterTypeList, CharacterClassificationList } from '../enums/characterEnums';
import { HEALTH_MIN, HEALTH_MAX, STAT_MIN, STAT_MAX } from '../enums/statLimits';

const { Option } = Select;

interface Props {
  visible: boolean;
  character: Character | null;
  onCancel: () => void;
  onSave: (values: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const CharacterEditModal: React.FC<Props> = ({ visible, character, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [spritePath, setSpritePath] = useState<string>('');

  // Base URL for API requests
  const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:8081';

  useEffect(() => {
    if (character) {
      form.setFieldsValue(character);
      setSpritePath(character.spritePath || '');
    } else {
      form.resetFields();
      setSpritePath('');
    }
  }, [character, form]);

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      // Use the new sprite path if one was uploaded, otherwise use the existing path
      const formData = {
        ...values,
        spritePath: spritePath || character?.spritePath || ''
      };
      onSave(formData);
    });
  };

  return (
    <Modal
      open={visible}
      title="Edit Character"
      onCancel={onCancel}
      footer={[
        <AppButton key="back" onClick={onCancel}>Cancel</AppButton>,
        <AppButton
          key="submit"
          type="primary"
          onClick={handleFormSubmit}
        >
          Save
        </AppButton>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <AppInput />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <AppInput />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            {CharacterTypeList.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="classification" label="Classification" rules={[{ required: true }]}>
          <Select>
            {CharacterClassificationList.map(classification => (
              <Option key={classification} value={classification}>{classification}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Character Sprite"
          help="Upload a new sprite or keep the existing one"
        >
          <div style={{ marginBottom: '10px' }}>
            {character?.spritePath && (
              <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <p>Current Sprite:</p>
                <img
                  src={`${apiBaseUrl}${character.spritePath}`}
                  alt="Current sprite"
                  style={{ maxWidth: '100%', maxHeight: '150px' }}
                />
              </div>
            )}
          </div>
          <SpriteUpload
            onUploadSuccess={(path) => setSpritePath(path)}
            characterId={character?.id}
          />
        </Form.Item>
        <Form.Item
          name="baseHealth"
          label="Base Health"
          rules={[{ required: true }]}
          help={`Value must be between ${HEALTH_MIN} and ${HEALTH_MAX}`}
        >
          <InputNumber min={HEALTH_MIN} max={HEALTH_MAX} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="baseAttack"
          label="Base Attack"
          rules={[{ required: true }]}
          help={`Value must be between ${STAT_MIN} and ${STAT_MAX}`}
        >
          <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="baseMagic"
          label="Base Magic"
          rules={[{ required: true }]}
          help={`Value must be between ${STAT_MIN} and ${STAT_MAX}`}
        >
          <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="basePhysicalDefense"
          label="Base Physical Defense"
          rules={[{ required: true }]}
          help={`Value must be between ${STAT_MIN} and ${STAT_MAX}`}
        >
          <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="baseMagicalDefense"
          label="Base Magical Defense"
          rules={[{ required: true }]}
          help={`Value must be between ${STAT_MIN} and ${STAT_MAX}`}
        >
          <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="baseSpeed"
          label="Base Speed"
          rules={[{ required: true }]}
          help={`Value must be between ${STAT_MIN} and ${STAT_MAX}`}
        >
          <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CharacterEditModal;