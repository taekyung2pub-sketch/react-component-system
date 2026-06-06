import * as React from 'react';
import { Portal } from '@/contexts/PortalContext';
import { BottomSheet } from '@/components/overlay/bottomSheet/BottomSheet';
import { Stack } from '@/components/layout/stack/Stack';
import { Button } from '@/components/common/button/Button';
import { TextField } from '@/components/form/textField/TextField';

export interface PopAddressProps {
    onClose: () => void;
    onSave: (address: {
        id: number;
        label: string;
        name: string;
        phone: string;
        address: string;
        detail: string;
        isDefault: boolean;
    }) => void;
}

export const PopAddress = ({ onClose, onSave }: PopAddressProps) => {
    return (
        <Portal>
            <BottomSheet
                title="주소 추가"
                onClose={onClose}
                body={
                    <Stack direction="vertical" gap="md">
                        <TextField type="text" placeholder="주소 레이블 (예: 집, 회사)" />
                        <TextField type="text" placeholder="수령인 이름" />
                        <TextField type="text" placeholder="연락처" />
                        <TextField type="text" placeholder="주소" />
                        <TextField type="text" placeholder="상세 주소" />
                    </Stack>
                }
                footer={
                    <Button
                        size="lg"
                        color="gray-dark"
                        fullWidth
                        onClick={() => {
                            onSave({
                                id:        Date.now(),
                                label:     '새 주소',
                                name:      '이태경',
                                phone:     '010-0000-0000',
                                address:   '새로 등록된 주소',
                                detail:    '',
                                isDefault: false,
                            });
                            onClose();
                        }}
                    >
                        저장
                    </Button>
                }
            />
        </Portal>
    );
};

export default PopAddress;