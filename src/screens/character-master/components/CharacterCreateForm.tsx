import React, { useState } from 'react';
import { Modal, Form, Select, InputNumber, Row, Col } from 'antd';
import AppInput from '../../../components/input/input';
import AppButton from '../../../components/button/button';
import SpriteUpload from '../../../components/upload/sprite-upload';
import type { Character } from '../types/Character';
import { CharacterTypeList, CharacterClassificationList } from '../enums/characterEnums';
import { HEALTH_MIN, HEALTH_MAX, STAT_MIN, STAT_MAX } from '../enums/statLimits';

const { Option } = Select;
const { TextArea } = AppInput;

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
      // Includes the uploaded sprite path in the form values
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
      width={700}
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
          <TextArea rows={4} />
        </Form.Item>

        {/* Type and Classification side by side */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="Type" initialValue="HERO" rules={[{ required: true }]}>
              <Select>
                {CharacterTypeList.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="classification" label="Classification" initialValue="Human" rules={[{ required: true }]}>
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
          required
          help="Please upload an SVG image for your character"
        >
          <SpriteUpload onUploadSuccess={(path) => setSpritePath(path)} />
        </Form.Item>

        {/* Health, Attack, Magic side by side */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="baseHealth"
              label="Health"
              rules={[{ required: true }]}
              initialValue={100}
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
              initialValue={10}
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
              initialValue={10}
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
              initialValue={10}
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
              initialValue={10}
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
              initialValue={10}
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

export default CharacterCreateForm;