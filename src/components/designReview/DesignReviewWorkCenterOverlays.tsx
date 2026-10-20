import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWorkCenter } from '../../context/WorkCenterContext'
export function DesignReviewMonitoringToast(){
 const {session}=useWorkCenter()
 const [visible,setVisible]=useState(false)
 const [changed,setChanged]=useState(false)
 useEffect(()=>{if(session.activeReminder){setVisible(true);setChanged(false)}},[session.activeReminder])
 useEffect(()=>{const listener=()=>{setChanged(true);setVisible(true)};window.addEventListener('prototype-issue-change',listener);return()=>window.removeEventListener('prototype-issue-change',listener)},[])
 if(!visible||!session.activeReminder)return null
 return <div className="dr-monitoring-toast"><div className="dr-wc-toast" role="status"><CheckCircle2/><div><p>{changed?'Issue #124 updated':"You'll be notified"}</p><p>{changed?'Simulated update: a revised drawing was linked to this issue.':`Assist will alert you when ${session.activeReminder} changes.`}</p></div><button aria-label="Dismiss notification" onClick={()=>setVisible(false)}><X/></button></div></div>
}
export function DesignReviewReminderPill(){
 const {session,setActiveReminder}=useWorkCenter()
 if(!session.activeReminder)return null
 return <div className="dr-reminder-dock"><div className="dr-reminder-pill"><span className="dr-reminder-dot"/>1 active reminder · <button onClick={()=>window.dispatchEvent(new Event('prototype-issue-change'))}>Simulate upload</button><button aria-label="Stop issue reminder" onClick={()=>setActiveReminder(null)}><X size={16}/></button></div></div>
}
export {designReviewIntentText} from '../../types/designReview'
