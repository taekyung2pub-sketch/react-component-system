// =========================
// Icon Map
// SVG 파일명 규칙: icon_{icon_name}.svg
// 저장 경로: src/assets/icons/
// =========================

import CircleIcon          from '../../../assets/icons/icon_circle.svg?react';
import HeartIcon           from '../../../assets/icons/icon_heart.svg?react';
import HeartFilledIcon     from '../../../assets/icons/icon_heart_filled.svg?react';
import BellIcon            from '../../../assets/icons/icon_bell.svg?react';
import EyeIcon             from '../../../assets/icons/icon_eye.svg?react';
import EyeOffIcon          from '../../../assets/icons/icon_eye_off.svg?react';
import SearchIcon          from '../../../assets/icons/icon_search.svg?react';
import WarningCircleIcon   from '../../../assets/icons/icon_warning_circle.svg?react';
import FilterIcon          from '../../../assets/icons/icon_filter.svg?react';
import SettingsIcon        from '../../../assets/icons/icon_settings.svg?react';
import BagIcon             from '../../../assets/icons/icon_bag.svg?react';
import CalendarIcon        from '../../../assets/icons/icon_calendar.svg?react';
import ArrowIcon           from '../../../assets/icons/icon_arrow.svg?react';
import HomeIcon            from '../../../assets/icons/icon_home.svg?react';
import MicIcon             from '../../../assets/icons/icon_mic.svg?react';
import MinusIcon           from '../../../assets/icons/icon_minus.svg?react';
import PlusIcon            from '../../../assets/icons/icon_plus.svg?react';
import TrashIcon           from '../../../assets/icons/icon_trash.svg?react';
import CancelIcon          from '../../../assets/icons/icon_cancel.svg?react';
import CancelCircleIcon    from '../../../assets/icons/icon_cancel_circle.svg?react';
import ChevronIcon         from '../../../assets/icons/icon_chevron.svg?react';
import UserIcon            from '../../../assets/icons/icon_user.svg?react';
import BoxIcon             from '../../../assets/icons/icon_box.svg?react';
import WarehouseFilledIcon from '../../../assets/icons/icon_warehouse_filled.svg?react';
import TruckFilledIcon     from '../../../assets/icons/icon_truck_filled.svg?react';
import ReturnIcon          from '../../../assets/icons/icon_return.svg?react';
import AddressIcon         from '../../../assets/icons/icon_address.svg?react';
import CardIcon            from '../../../assets/icons/icon_card.svg?react';
import ChatIcon            from '../../../assets/icons/icon_chat.svg?react';
import CheckIcon           from '../../../assets/icons/icon_check.svg?react';
import CheckCircleIcon     from '../../../assets/icons/icon_check_circle.svg?react';
import LogoutIcon          from '../../../assets/icons/icon_logout.svg?react';
import PhoneIcon           from '../../../assets/icons/icon_phone.svg?react';
import EditIcon            from '../../../assets/icons/icon_edit.svg?react';
import QuestionIcon        from '../../../assets/icons/icon_question.svg?react';
import CartIcon            from '../../../assets/icons/icon_cart.svg?react';
import CashIcon            from '../../../assets/icons/icon_cash.svg?react';
import LocationIcon        from '../../../assets/icons/icon_location.svg?react';
import LocationFilledIcon  from '../../../assets/icons/icon_location_filled.svg?react';
import HeadphoneIcon       from '../../../assets/icons/icon_headphone.svg?react';
import ImageIcon           from '../../../assets/icons/icon_image.svg?react';
import DiscountIcon        from '../../../assets/icons/icon_discount.svg?react';
import FacebookIcon        from '../../../assets/icons/icon_facebook.svg?react';
import TwitterIcon         from '../../../assets/icons/icon_twitter.svg?react';
import InstagramIcon       from '../../../assets/icons/icon_instagram.svg?react';
import ApplePayIcon        from '../../../assets/icons/icon_apple_pay.svg?react';
import VisaIcon            from '../../../assets/icons/icon_visa.svg?react';
import MastercardIcon      from '../../../assets/icons/icon_mastercard.svg?react';
import StarIcon            from '../../../assets/icons/icon_star.svg?react';

export const iconMap = {
    // Navigation
    'home':              HomeIcon,
    'arrow':             ArrowIcon,
    'chevron':           ChevronIcon,

    // Action
    'search':            SearchIcon,
    'filter':            FilterIcon,
    'edit':              EditIcon,
    'trash':             TrashIcon,
    'plus':              PlusIcon,
    'minus':             MinusIcon,
    'cancel':            CancelIcon,
    'cancel_circle':     CancelCircleIcon,
    'check':             CheckIcon,
    'check_circle':      CheckCircleIcon,
    'settings':          SettingsIcon,
    'mic':               MicIcon,

    // User
    'user':              UserIcon,
    'logout':            LogoutIcon,
    'address':           AddressIcon,
    'phone':             PhoneIcon,
    'chat':              ChatIcon,
    'headphone':         HeadphoneIcon,

    // Commerce
    'cart':              CartIcon,
    'bag':               BagIcon,
    'discount':          DiscountIcon,
    'cash':              CashIcon,
    'card':              CardIcon,
    'return':            ReturnIcon,

    // Delivery
    'box':               BoxIcon,
    'warehouse_filled':  WarehouseFilledIcon,
    'truck_filled':      TruckFilledIcon,
    'location':          LocationIcon,
    'location_filled':   LocationFilledIcon,

    // Content
    'heart':             HeartIcon,
    'heart_filled':      HeartFilledIcon,
    'star':              StarIcon,
    'bell':              BellIcon,
    'eye':               EyeIcon,
    'eye_off':           EyeOffIcon,
    'image':             ImageIcon,
    'calendar':          CalendarIcon,

    // Status
    'circle':            CircleIcon,
    'warning_circle':    WarningCircleIcon,
    'question':          QuestionIcon,

    // Social
    'facebook':          FacebookIcon,
    'twitter':           TwitterIcon,
    'instagram':         InstagramIcon,

    // Payment
    'apple_pay':         ApplePayIcon,
    'visa':              VisaIcon,
    'mastercard':        MastercardIcon,
} as const;

export type IconName = keyof typeof iconMap;