import React, { useEffect } from 'react';
import { Modal, Form, Select, InputNumber } from 'antd';
import AppInput from '../../../components/input/input';
import AppButton from '../../../components/button/button';
import type { Character } from '../types/character';

const { Option } = Select;

interface Props {
  visible: boolean;
  character: Character | null;
  onCancel: () => void;
  onSave: (values: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const CharacterEditModal: React.FC<Props> = ({ visible, character, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (character) {
      form.setFieldsValue(character);
    } else {
      form.resetFields();
    }
  }, [character, form]);

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
          onClick={() => {
            form.validateFields().then(values => {
              onSave(values);
              form.resetFields();
            });
          }}
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
            <Option value="HERO">HERO</Option>
            <Option value="VILLAIN">VILLAIN</Option>
          </Select>
        </Form.Item>
        <Form.Item name="classification" label="Classification" rules={[{ required: true }]}>
          <AppInput />
        </Form.Item>
        <Form.Item name="spritePath" label="Sprite Path" rules={[{ required: true }]}>
          <AppInput />
        </Form.Item>
        <Form.Item name="baseHealth" label="Base Health" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseAttack" label="Base Attack" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseMagic" label="Base Magic" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="basePhysicalDefense" label="Base Physical Defense" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseMagicalDefense" label="Base Magical Defense" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseSpeed" label="Base Speed" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CharacterEditModal;