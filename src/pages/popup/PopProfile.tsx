import * as React from 'react';
import { Portal } from '@/contexts/PortalContext';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Stack } from '@/components/layout/stack/Stack';
import { Button } from '@/components/common/button/Button';
import { TextField } from '@/components/form/textField/TextField';

export interface PopProfileProps {
    onClose: () => void;
}

export const PopProfile = ({ onClose }: PopProfileProps) => {
    return (
        <Portal>
            <BottomSheet
                title="프로필 수정"
                onClose={onClose}
                body={
                    <Stack direction="vertical" gap="md">
                        <TextField type="text" placeholder="이름" />
                        <TextField type="email" placeholder="이메일" />
                        <TextField type="password" placeholder="현재 비밀번호" />
                        <TextField type="password" placeholder="새 비밀번호" />
                    </Stack>
                }
                footer={
                    <Button size="lg" color="gray-dark" fullWidth onClick={onClose}>
                        저장
                    </Button>
                }
            />
        </Portal>
    );
};

export default PopProfile;