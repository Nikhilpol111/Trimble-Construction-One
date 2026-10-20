import { CheckCircle2, ChevronDown, FileText, Mic, Plus, Send, Sparkles, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { uploadDrawingIntentText, useUploadDrawing } from '../../context/UploadDrawingContext'
import { useDesignReview } from '../../context/DesignReviewContext'
import { useGeneratedWidgets } from '../../context/GeneratedWidgetsContext'
import { generatedWidgetsIntentText } from '../../flows/generatedWidgets'
import { designReviewIntentText } from '../../types/designReview'
import { quickActions } from '../../data/workCenter'
import { useWorkCenter } from '../../context/WorkCenterContext'
import { AssistSymbol } from '../assist/AssistSymbol'

export function QuickActionChip({label,onClick}:{label:string;onClick?:()=>void}){
 return <button type="button" className="wc-quick-action" onClick={onClick}><Sparkles/>{label}</button>
}
export function PromptComposer(){
 const {onQuickAction}=useWorkCenter()
 const {beginFromWorkCenter:beginDesignReview}=useDesignReview()
 const {beginFromWorkCenter:beginGeneratedWidgets,openCustomiseDashboard}=useGeneratedWidgets()
 const {workCenterAttachment,attachFileForUpload,clearWorkCenterAttachment,beginUploadFromWorkCenter}=useUploadDrawing()
 const [value,setValue]=useState('')
 const expanded=Boolean(workCenterAttachment||value.trim())
 function submit(e:FormEvent){e.preventDefault();const prompt=value.trim();if(!prompt&&!workCenterAttachment)return
  if(workCenterAttachment){beginUploadFromWorkCenter(prompt||uploadDrawingIntentText);setValue('');return}
  if(beginDesignReview(prompt)||beginGeneratedWidgets(prompt))setValue('')
 }
 function attach(){attachFileForUpload();if(!value.trim())setValue(uploadDrawingIntentText)}
 function quickAction(id:string){if(id==='project-briefing')setValue(designReviewIntentText);if(id==='generate-widgets')setValue(generatedWidgetsIntentText);if(id==='customise-widgets')openCustomiseDashboard();onQuickAction(id)}
 return <div className={`wc-root wc-composer-dock ${expanded?'has-attachment':''}`}>
  <div className="wc-composer-container">
   <form className="wc-composer-form" onSubmit={submit}>
    {workCenterAttachment&&<div className="wc-attachment"><span className="upload-file-icon"><FileText/></span><div><p>EilansBungalow.pdf</p><span><CheckCircle2/>Uploaded · 100%</span></div><button type="button" aria-label="Remove attachment" onClick={clearWorkCenterAttachment}><X/></button></div>}
    <div className="wc-prompt-row"><textarea rows={expanded?2:1} aria-label="Ask Trimble AI" placeholder="How can Trimble AI help you start your day?" value={value} onChange={e=>setValue(e.target.value)}/>
     {!expanded&&<div className="wc-prompt-controls"><button type="button" aria-label="Attach file" onClick={attach}><Plus/></button><button type="button" aria-label="Voice input"><Mic/></button><button className="wc-send" type="submit" aria-label="Send"><Send/></button></div>}
    </div>
    {expanded&&<div className="wc-prompt-bottom"><button type="button" className="wc-context"><AssistSymbol/>Trimble AI · All projects<ChevronDown/></button><div className="wc-prompt-controls"><button type="button" aria-label="Attach file" onClick={attach}><Plus/></button><button type="button" aria-label="Voice input"><Mic/></button><button className="wc-send" type="submit" aria-label="Send"><Send/></button></div></div>}
   </form>
   <p className="wc-ai-notice">AI can make mistakes. <button type="button">Acceptable Use</button></p>
   <div className="wc-quick-actions">{quickActions.map(a=><QuickActionChip key={a.id} label={a.label} onClick={()=>quickAction(a.id)}/>)}</div>
  </div>
 </div>
}
