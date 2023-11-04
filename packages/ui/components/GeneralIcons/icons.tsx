import React from 'react'
import {
  Add,
  AlarmBell,
  ArrowLeft,
  ArrowRight,
  Avatar,
  Burger,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Close,
  Cross,
  Download,
  Exclamation,
  Eye,
  EyeOff,
  LocationPin,
  Logout,
  Menu,
  MinusInCircle,
  MoreInfo,
  Pencil,
  Plan,
  Plus,
  PlusInCircle,
  ProfileSettings,
  Refresh,
  Stopwatch,
  Tick,
  TickCircle,
  Trash,
  Upload,
  VerticalSlider,
} from './GeneralIcons'

export const renderIcons = (label: string) => {
  // eslint-disable-next-line sonarjs/max-switch-cases
  switch (label) {
    case 'Add':
      return <Add />
    case 'AlarmBell':
      return <AlarmBell />
    case 'ArrowLeft':
      return <ArrowLeft />
    case 'ArrowRight':
      return <ArrowRight />
    case 'Avatar':
      return <Avatar />
    case 'Burger':
      return <Burger />
    case 'Check':
      return <Check />
    case 'ChevronDown':
      return <ChevronDown />
    case 'ChevronUp':
      return <ChevronUp />
    case 'Cross':
      return <Cross />
    case 'LocationPin':
      return <LocationPin />
    case 'Logout':
      return <Logout />
    case 'Plus':
      return <Plus />
    case 'ProfileSettings':
      return <ProfileSettings />
    case 'Refresh':
      return <Refresh />
    case 'Stopwatch':
      return <Stopwatch />
    case 'Tick':
      return <Tick />
    case 'Trash':
      return <Trash />
    case 'Upload':
      return <Upload />
    case 'Download':
      return <Download />
    case 'Eye':
      return <Eye />
    case 'EyeOff':
      return <EyeOff />
    case 'MoreInfo':
      return <MoreInfo />
    case 'Exclamation':
      return <Exclamation />
    case 'TickCircle':
      return <TickCircle />
    case 'PlusInCircle':
      return <PlusInCircle />
    case 'Menu':
      return <Menu />
    case 'MinusInCircle':
      return <MinusInCircle />
    case 'Plan':
      return <Plan width={20} height={20} />
    case 'Pencil':
      return <Pencil />
    case 'Close':
      return <Close />
    case 'Camera':
      return <Camera />
    case 'VerticalSlider':
      return <VerticalSlider />
    default:
      return null
  }
}
