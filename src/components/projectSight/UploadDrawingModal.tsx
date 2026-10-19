import { useEffect, useRef } from 'react'
import { CircleCheck, FileText, Sparkles, X } from 'lucide-react'
import { drawingSetOptions } from '../../data/projectSightDrawings'
export type UploadDrawingModalProps = {
 open:boolean;fileName:string;project:string;group:string;drawingSet:string;revisionDate:string;uploadEnabled:boolean
 onDrawingSetChange:(value:string)=>void;onRevisionDateChange:(value:string)=>void;onCancel:()=>void;onUpload:()=>void
}
function FilledBadge(){return <span className="upload-filled"><Sparkles/>Filled by Assist</span>}
export function UploadDrawingModal(p:UploadDrawingModalProps){
 const ref=useRef<HTMLDialogElement>(null)
 useEffect(()=>{const dialog=ref.current;if(p.open){if(!dialog?.open)dialog?.showModal()}else dialog?.close()},[p.open])
 return <dialog ref={ref} className="ps-root upload-dialog" aria-labelledby="upload-drawing-title" onCancel={e=>{e.preventDefault();p.onCancel()}}>
  <header><h2 id="upload-drawing-title">Upload Drawing</h2><button type="button" aria-label="Close upload" onClick={p.onCancel}><X/></button></header>
  <form onSubmit={e=>{e.preventDefault();if(p.uploadEnabled)p.onUpload()}}>
   <div className="upload-dialog-fields">
    <div className="upload-file"><span className="upload-file-icon"><FileText/></span><div><p>{p.fileName}</p><span>Ready to process</span></div><CircleCheck className="upload-file-ready"/></div>
    <label htmlFor="upload-project">Project <FilledBadge/></label><input id="upload-project" value={p.project} readOnly/>
    <label htmlFor="upload-group">Group <FilledBadge/></label><input id="upload-group" value={p.group} readOnly/>
    <label htmlFor="upload-drawing-set">Drawing set <em>*</em></label>
    <select id="upload-drawing-set" required value={p.drawingSet} data-missing={!p.drawingSet} onChange={e=>p.onDrawingSetChange(e.target.value)}>
     {drawingSetOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <label htmlFor="upload-revision-date">Revision date <em>*</em></label>
    <input id="upload-revision-date" type="date" required value={p.revisionDate} data-missing={!p.revisionDate} onInput={e=>p.onRevisionDateChange(e.currentTarget.value)} onChange={e=>p.onRevisionDateChange(e.target.value)}/>
   </div>
   <footer><button type="button" onClick={p.onCancel}>Cancel</button><button type="submit" disabled={!p.uploadEnabled}>Upload</button></footer>
  </form>
 </dialog>
}

