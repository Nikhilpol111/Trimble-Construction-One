import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useDesignReview } from '../../context/DesignReviewContext'
import { BuildingModel } from './BuildingModel'
const references=['SketchUp · Mechanical Room East Wall','Trimble Connect · Model v18','ProjectSight · Drawing A-204','ProjectSight · RFI-087']
export function EvidenceInspectionMainView(){
 const {state}=useDesignReview()
 const drawing=state.evidenceSource==='drawing'
 return <div className="dr-evidence-workspace"><article className="dr-evidence-document">
 <header><div><h1>{drawing?'Drawing A-204':'RFI-087'}</h1><p>{drawing?'Previous coordinated layout':'Mechanical services clearance'}</p></div><span className="dr-status">{drawing?'Previous revision':'Open'}</span></header>
 {drawing?<><div className="dr-drawing-sheet"><svg viewBox="0 0 700 300" aria-label="Previous mechanical room drawing"><g fill="none" stroke="#70859b" strokeWidth="3"><rect x="80" y="35" width="530" height="225"/><path d="M390 35V260M80 150H610M445 60V220H570V60ZM445 120H570"/><rect x="475" y="140" width="65" height="45"/></g><text x="100" y="90" fill="#64788c" fontSize="18">LEVEL 3 · A-204</text><text x="405" y="285" fill="#64788c" fontSize="15">Previous east-wall position</text></svg></div><p>Mechanical room east wall · Level 3. This revision shows the wall before the 450 mm shift.</p></>:<dl><dt>QUESTION</dt><dd>What is the minimum required clearance around mechanical services at the Level 3 mechanical room?</dd><dt>RAISED BY</dt><dd>Alex Morgan · MEP Coordinator</dd><dt>LOCATION</dt><dd>Mechanical room east wall · Level 3</dd></dl>}
 </article></div>
}
export function IssueDraftMainView(){
 const {state,updateDraftIssue,createIssue,returnToImpactSummary}=useDesignReview()
 const [editing,setEditing]=useState(false)
 const d=state.draftIssue
 return <div className="dr-draft"><span className="dr-draft-badge">☼ AI-generated draft — review before creating</span><form className="dr-issue-form" onSubmit={e=>{e.preventDefault();if(d.title.trim()&&d.description.trim())createIssue()}}>
 <h1>Review coordination issue</h1>
 <div className="dr-draft-body"><div className="dr-context-fields"><label>DESTINATION<span>ProjectSight</span></label><label>PROJECT<span>North Ridge Infrastructure</span></label></div>
 <div className="dr-draft-columns"><div><label>ISSUE TITLE<input aria-label="Issue title" required value={d.title} readOnly={!editing} onChange={e=>updateDraftIssue({title:e.target.value})}/></label>
 <label>DESCRIPTION<textarea aria-label="Description" required rows={6} readOnly={!editing} value={d.description} onChange={e=>updateDraftIssue({description:e.target.value})}/></label>
 <div className="dr-assignment"><label>PRIORITY<select aria-label="Priority" disabled={!editing} value={d.priority} onChange={e=>updateDraftIssue({priority:e.target.value})}>{['High','Medium','Low'].map(x=><option key={x}>{x}</option>)}</select></label><label>ASSIGNEE<input aria-label="Assignee" readOnly={!editing} value={d.assignee} onChange={e=>updateDraftIssue({assignee:e.target.value})}/></label><label>DUE DATE<input aria-label="Due date" type="date" readOnly={!editing} value={d.dueDate} onInput={e=>updateDraftIssue({dueDate:e.currentTarget.value})} onChange={e=>updateDraftIssue({dueDate:e.target.value})}/></label></div>
 </div><div><label>MODEL SNAPSHOT</label><div className="dr-model-snapshot"><BuildingModel selected/><p>SketchUp · East Wall · v18</p></div><label>LINKED EVIDENCE</label><ul className="dr-linked-evidence">{references.map((r,i)=><li key={r}><label><input type="checkbox" aria-label={`Include ${r}`} checked={state.includedEvidence.includes(i)} disabled={!editing} onChange={()=>updateDraftIssue({includedEvidence:state.includedEvidence.includes(i)?state.includedEvidence.filter(n=>n!==i):[...state.includedEvidence,i]})}/>{r}</label></li>)}</ul></div></div></div>
 <footer><p>Nothing is created until you confirm.</p><div><button type="button" onClick={returnToImpactSummary}>Cancel</button><button type="button" onClick={()=>setEditing(!editing)}>{editing?'Done editing':'♢ Edit'}</button><button type="submit" disabled={!d.title.trim()||!d.description.trim()}>Create Issue</button></div></footer>
 </form></div>
}
export function IssueCreatedMainView(){
 const {state}=useDesignReview()
 return <div className="dr-created-workspace"><section className="dr-created-card" tabIndex={-1} id="created-issue"><header><CheckCircle2/><div><h1>Coordination Issue #{state.issueNumber} created</h1><p>ProjectSight · North Ridge Infrastructure</p></div></header><div className="dr-created-title">{state.draftIssue.title}<span className="dr-status">Open</span></div>{state.issueDetailsOpen&&<dl className="dr-issue-details"><dt>Description</dt><dd>{state.draftIssue.description}</dd><dt>Priority · Assignee · Due date</dt><dd>{state.draftIssue.priority} · {state.draftIssue.assignee} · {state.draftIssue.dueDate||'Not set'}</dd></dl>}<p>CONNECTED REFERENCES</p><div className="dr-connected-references">{references.filter((_,i)=>state.includedEvidence.includes(i)).map(r=><span key={r}>{r}</span>)}</div></section></div>
}
