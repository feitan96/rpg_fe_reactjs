import React, { useState } from 'react';
import { Modal, Form, Select, InputNumber } from 'antd';
import AppInput from '../../../components/input/input';
import AppButton from '../../../components/button/button';
import SpriteUpload from '../../../components/upload/sprite-upload';
import type { Character } from '../types/Character';
import { CharacterTypeList, CharacterClassificationList } from '../enums/characterEnums';

const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const CharacterCreateForm: React.FC<Props> = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [spritePath, setSpritePath] = useState<string>('');

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      // Include the uploaded sprite path in the form values
      const formData = {
        ...values,
        spritePath: spritePath
      };
      onCreate(formData);
      form.resetFields();
      setSpritePath('');
    });
  };

  return (
    <Modal
      open={visible}
      title="Create Character"
      onCancel={onCancel}
      footer={[
        <AppButton key="back" onClick={onCancel}>Cancel</AppButton>,
        <AppButton
          key="submit"
          type="primary"
          onClick={handleFormSubmit}
          disabled={!spritePath}
        >
          Create
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
        <Form.Item name="type" label="Type" initialValue="HERO" rules={[{ required: true }]}>
          <Select>
            {CharacterTypeList.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="classification" label="Classification" initialValue="Human" rules={[{ required: true }]}>
          <Select>
            {CharacterClassificationList.map(classification => (
              <Option key={classification} value={classification}>{classification}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Character Sprite"
          required
          help="Please upload an SVG image for your character"
        >
          <SpriteUpload onUploadSuccess={(path) => setSpritePath(path)} />
        </Form.Item>
        <Form.Item name="baseHealth" label="Base Health" rules={[{ required: true }]} initialValue={100}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseAttack" label="Base Attack" rules={[{ required: true }]} initialValue={10}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseMagic" label="Base Magic" rules={[{ required: true }]} initialValue={10}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="basePhysicalDefense" label="Base Physical Defense" rules={[{ required: true }]} initialValue={5}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseMagicalDefense" label="Base Magical Defense" rules={[{ required: true }]} initialValue={5}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="baseSpeed" label="Base Speed" rules={[{ required: true }]} initialValue={10}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CharacterCreateForm;