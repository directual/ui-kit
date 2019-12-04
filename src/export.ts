// global CSS
import './lib/styles/global.scss';
import './lib/styles/default.css';

// components
import Alert from './modules/alert/Alert';
import Badge from './modules/badge/Badge';
import BlockHeader from './modules/block-header/BlockHeader';
import Button from './modules/button/Button';
// deprecated
import AccentButton from './modules/button/AccentButton';
// deprecated
import LinkButton from './modules/button/LinkButton';
import IconButton from './modules/button/IconButton';
import ButtonGroup from './modules/button/ButtonGroup';
import CardDefault from './modules/card/CardDefault';
import CardImaged from './modules/card/CardImaged';
import CropImage from './modules/crop-image/CropImage';
import Checkbox from './modules/checkbox/Checkbox';
import Icon from './modules/icon';
import HandleBar from './modules/handlebar/Handlebar';
import Header from './modules/header/Header';
import Spinner from './modules/loader/Spinner';
import SimpleLoader from './modules/loader/SimpleLoader';
import ProgressLoader from './modules/loader/ProgressLoader';

import MenuIcon from './modules/menu/MenuIcon';
import MenuContent from './modules/menu/MenuContent';

import Modal from './modules/modal/Modal';
import ModalTabs from './modules/modal/ModalTabs';
import Notification from './modules/notification/Notification';
import SidePanel from './modules/side-panel/SidePanel';
import SidePanelResizable from './modules/side-panel/SidePanelResizable';
import Radio from './modules/radio/Radio';
import RadioGroup from './modules/radio/RadioGroup';
import Collapse from './modules/collapse/Collapse';
import Sidebar from './modules/sidebar/Sidebar';
import Tabs from './modules/tabs/Tabs';
import TabPane from './modules/tabs/TabPane';
import Tag from './modules/tag/Tag';
import Input from './modules/input/InputText';
import Table from './modules/table/Table';
import TextArea from './modules/input/TextArea';
import Toggle from './modules/toggle';
import Tooltip from './modules/tooltip/Tooltip';
import FileUpload from './modules/upload/FileUpload';
import KeyValue from './modules/key-value/KeyValue';


import Dropdown from './lib/components/dropdown/DropdownComponent';
import {
  Select,
  SelectCheckable,
  SelectTree,
  SelectCheckableTree,
} from './modules/select';
import { List, CheckableList } from './modules/list';
import Tree from './modules/tree/Tree';
import TimePicker from './modules/TimePicker/TimePicker';
import DatePicker from './modules/DatePicker/DatePicker';
import notify from './modules/notify/Notify';

// // variables
import { colors, getRandomColor } from './lib/styles/colors';
import { getIconsList, getRandomIconName } from './modules/icon/svgCollection';

// methods
import Dates from './lib/dates';
import Numbers from './lib/numbers';

// provider
import { StorybookProvider, StorybookContext } from './modules/StorybookProvider/StorybookProvider';
import { useStorybook, withStorybook } from './modules/StorybookProvider/withStorybook';

const iconsList = getIconsList();


export {
  // components
  Alert,
  Badge,
  BlockHeader,
  Button,
  IconButton,
  AccentButton,
  LinkButton,
  ButtonGroup,
  // Dropdown,
  CardDefault,
  CardImaged,
  Checkbox,
  CropImage,
  TimePicker,
  DatePicker,
  HandleBar,
  Header,
  Icon,
  Spinner,
  SimpleLoader,
  ProgressLoader,
  MenuIcon,
  MenuContent,
  Collapse,
  Modal,
  ModalTabs,
  Notification,
  SidePanel,
  SidePanelResizable,
  Radio,
  RadioGroup,
  Sidebar,
  TextArea,
  Tabs,
  TabPane,
  Tag,
  Table,
  Input,
  Toggle,
  Tooltip,
  FileUpload,
  KeyValue,
  Dropdown,
  Select,
  SelectCheckable,
  SelectTree,
  SelectCheckableTree,
  List,
  CheckableList,
  Tree,

  // methods
  Dates,
  Numbers,
  notify,
  // variables
  colors,
  iconsList,
  getRandomColor,
  getRandomIconName,
  // provider
  StorybookContext,
  StorybookProvider,
  useStorybook,
  withStorybook,
};
