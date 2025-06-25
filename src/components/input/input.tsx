import { Input } from 'antd';
import type { InputProps, TextAreaProps } from 'antd';
import React from 'react';

const AppInput: React.FC<InputProps> = (props) => <Input {...props} />;

AppInput.TextArea = (props: TextAreaProps) => <Input.TextArea {...props} />;

export default AppInput;