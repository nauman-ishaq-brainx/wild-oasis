import Tab from "../../ui/Tab";

export default function Tabs(){
    return (
        <Tab defaultValue={'Profile'}>
            <Tab.Trigger value='Profile' />
            <Tab.Trigger value='Settings' />
            <Tab.Trigger value='Members' />
            
            <Tab.Content value='Profile'>
                Profile Content
            </Tab.Content>
            <Tab.Content value='Settings'>
                Settings Content
            </Tab.Content>
            <Tab.Content value='Members'>
                Members Content
            </Tab.Content>
        </Tab>
    )
}