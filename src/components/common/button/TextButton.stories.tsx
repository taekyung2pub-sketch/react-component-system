import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TextButton } from './TextButton';

// =========================
// Meta
// =========================

const meta = {
  title: 'Component/Common/TextButton',
  component: TextButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '텍스트 버튼 사이즈 (sm:12px / md:14px / lg:16px)',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'inline-radio',
      options: ['gray-dark', 'gray-light', 'primary', 'secondary', 'error'],
      description: '색상 테마',
      table: { defaultValue: { summary: 'primary' } },
    },
    underline: {
      control: 'boolean',
      description: '밑줄 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
    underline: false,
    children: 'TextButton',
  },
};

// =========================
// Color
// =========================

export const Color: Story = {
  name: 'color',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <TextButton color="gray-dark">TextButton</TextButton>
      <TextButton color="gray-light">TextButton</TextButton>
      <TextButton color="primary">TextButton</TextButton>
      <TextButton color="secondary">TextButton</TextButton>
      <TextButton color="error">TextButton</TextButton>
    </div>
  ),
};

// =========================
// Size
// =========================

export const Size: Story = {
  name: 'size',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <TextButton size="sm">TextButton</TextButton>
      <TextButton size="md">TextButton</TextButton>
      <TextButton size="lg">TextButton</TextButton>
    </div>
  ),
};

// =========================
// Underline
// =========================

export const Underline: Story = {
  name: 'underline',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <TextButton underline={false}>TextButton</TextButton>
      <TextButton underline>TextButton</TextButton>
    </div>
  ),
};

// =========================
// Icon
// =========================

export const WithIcon: Story = {
  name: 'icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <TextButton leftIcon="heart">TextButton</TextButton>
        <TextButton rightIcon="arrow">TextButton</TextButton>
        <TextButton leftIcon="heart" rightIcon="arrow">TextButton</TextButton>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <TextButton size="sm" leftIcon="heart">TextButton</TextButton>
        <TextButton size="md" leftIcon="heart">TextButton</TextButton>
        <TextButton size="lg" leftIcon="heart">TextButton</TextButton>
      </div>
    </div>
  ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
  name: 'disabled',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <TextButton disabled color="primary">TextButton</TextButton>
      <TextButton disabled color="gray-dark">TextButton</TextButton>
      <TextButton disabled color="error">TextButton</TextButton>
    </div>
  ),
};
