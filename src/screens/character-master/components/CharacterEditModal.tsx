import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, InputNumber, Row, Col } from 'antd';
import AppInput from '../../../components/input/input';
import AppButton from '../../../components/button/button';
import SpriteUpload from '../../../components/upload/sprite-upload';
import type { Character } from '../types/character';
import { CharacterTypeList, CharacterClassificationList } from '../enums/characterEnums';
import { HEALTH_MIN, HEALTH_MAX, STAT_MIN, STAT_MAX } from '../enums/statLimits';

const { Option } = Select;
const { TextArea } = AppInput;

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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

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
      // Uses the new sprite path if one was uploaded, otherwise uses the existing path
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
      width={700}
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
        <Form.Item name="name" label="Name" rules={[
          { required: true },
          { max: 50, message: 'Name cannot exceed 50 characters' }
        ]}>
          <AppInput maxLength={50} showCount />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[
          { required: true },
          { max: 256, message: 'Description cannot exceed 256 characters' }
        ]}>
          <TextArea rows={4} maxLength={256} showCount />
        </Form.Item>

        {/* Type and Classification side by side */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select>
                {CharacterTypeList.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="classification" label="Classification" rules={[{ required: true }]}>
              <Select>
                {CharacterClassificationList.map(classification => (
                  <Option key={classification} value={classification}>{classification}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

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

        {/* Health, Attack, Magic side by side */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="baseHealth"
              label="Health"
              rules={[{ required: true }]}
              help={`${HEALTH_MIN}-${HEALTH_MAX}`}
            >
              <InputNumber min={HEALTH_MIN} max={HEALTH_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="baseAttack"
              label="Attack"
              rules={[{ required: true }]}
              help={`${STAT_MIN}-${STAT_MAX}`}
            >
              <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="baseMagic"
              label="Magic"
              rules={[{ required: true }]}
              help={`${STAT_MIN}-${STAT_MAX}`}
            >
              <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Physical Defense, Magical Defense, Speed side by side */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="basePhysicalDefense"
              label="Physical Defense"
              rules={[{ required: true }]}
              help={`${STAT_MIN}-${STAT_MAX}`}
            >
              <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="baseMagicalDefense"
              label="Magical Defense"
              rules={[{ required: true }]}
              help={`${STAT_MIN}-${STAT_MAX}`}
            >
              <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="baseSpeed"
              label="Speed"
              rules={[{ required: true }]}
              help={`${STAT_MIN}-${STAT_MAX}`}
            >
              <InputNumber min={STAT_MIN} max={STAT_MAX} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CharacterEditModal;