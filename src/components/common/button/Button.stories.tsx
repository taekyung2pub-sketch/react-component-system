import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from './Button';

// =========================
// Meta
// =========================

const meta = {
  title: 'Component/Common/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '버튼 사이즈 (높이 기준 sm:32 / md:40 / lg:48)',
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['filled', 'soft', 'outline'],
      description: 'filled — 배경 채움 / soft — 연한 배경 / outline — 테두리만',
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      control: 'inline-radio',
      options: ['gray-dark', 'gray-light', 'primary', 'secondary', 'error'],
      description: '색상 테마',
      table: { defaultValue: { summary: 'primary' } },
    },
    rounded: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'full'],
      description: '모서리 둥글기',
      table: { defaultValue: { summary: 'md' } },
    },
    leftIcon: {
      control: 'text',
      description: '왼쪽 아이콘 (IconName)',
    },
    rightIcon: {
      control: 'text',
      description: '오른쪽 아이콘 (IconName)',
    },
    fullWidth: {
      control: 'boolean',
      description: '너비 꽉 채우기',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// Default
// =========================

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'filled',
    color: 'primary',
    rounded: 'md',
    children: 'Button',
  },
};

// =========================
// Variant
// =========================

export const Variant: Story = {
  name: 'variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['gray-dark', 'gray-light', 'primary', 'secondary', 'error'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button variant="filled"  color={color}>Button</Button>
          <Button variant="soft"    color={color}>Button</Button>
          <Button variant="outline" color={color}>Button</Button>
        </div>
      ))}
    </div>
  ),
};

// =========================
// Color
// =========================

export const Color: Story = {
  name: 'color',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button color="gray-dark">Button</Button>
      <Button color="gray-light">Button</Button>
      <Button color="primary">Button</Button>
      <Button color="secondary">Button</Button>
      <Button color="error">Button</Button>
    </div>
  ),
};

// =========================
// Size
// =========================

export const Size: Story = {
  name: 'size',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
};

// =========================
// Rounded
// =========================

export const Rounded: Story = {
  name: 'rounded',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button rounded="sm">Button</Button>
      <Button rounded="md">Button</Button>
      <Button rounded="lg">Button</Button>
      <Button rounded="full">Button</Button>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button leftIcon="heart">Button</Button>
        <Button rightIcon="arrow">Button</Button>
        <Button leftIcon="heart" rightIcon="arrow">Button</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button size="sm" leftIcon="heart">Button</Button>
        <Button size="md" leftIcon="heart">Button</Button>
        <Button size="lg" leftIcon="heart">Button</Button>
      </div>
      {/* 아이콘만 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button size="sm" leftIcon="heart" />
        <Button size="md" leftIcon="heart" />
        <Button size="lg" leftIcon="heart" />
      </div>
    </div>
  ),
};

// =========================
// FullWidth
// =========================

export const FullWidth: Story = {
  name: 'fullWidth',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
      <Button fullWidth>Button</Button>
      <Button fullWidth variant="soft">Button</Button>
      <Button fullWidth variant="outline">Button</Button>
    </div>
  ),
};

// =========================
// Disabled
// =========================

export const Disabled: Story = {
  name: 'disabled',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button disabled variant="filled">Button</Button>
      <Button disabled variant="soft">Button</Button>
      <Button disabled variant="outline">Button</Button>
    </div>
  ),
};
