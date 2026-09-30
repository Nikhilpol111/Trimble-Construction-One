import { Sidebar, type SidebarProps } from './Sidebar'

export type SetupSidebarProps = Omit<SidebarProps, 'header'>

export function SetupSidebar(props: SetupSidebarProps) {
  return <Sidebar {...props} header="Setup" />
}
