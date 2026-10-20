import { MapPin, AlertTriangle, Lightbulb } from 'lucide-react'
import type { ComparisonMode } from '../../types/designReview'
import { useDesignReview } from '../../context/DesignReviewContext'
import { BuildingModel } from './BuildingModel'
export function SketchUpModelView({mode,comparisonMode='current',onComparisonModeChange}:{mode:'select'|'selected'|'comparison'|'findings';comparisonMode?:ComparisonMode;onComparisonModeChange?:(m:ComparisonMode)=>void}){
 const {selectWall,state}=useDesignReview()
 return <div className="dr-model-workspace">
 {mode==='select'&&<div className="dr-model-banner"><MapPin/> Referenced area highlighted - select the changed wall to inspect</div>}
 {mode==='selected'&&<div className="dr-selected-entity"><span>SELECTED ENTITY</span><p>Mechanical Room East Wall</p></div>}
 {mode==='comparison'&&state.flowState==='sketchupComparison'&&<div className="dr-comparison-tabs">View : {(['previous','current','overlay'] as const).map(m=><button key={m} aria-pressed={comparisonMode===m} onClick={()=>onComparisonModeChange?.(m)}>{m==='previous'?'Previous (V17)':m==='current'?'Current (V18)':'Overlay'}</button>)}</div>}
 <BuildingModel selected={mode!=='select'} previous={mode==='comparison'&&comparisonMode==='previous'} overlay={mode==='comparison'&&comparisonMode==='overlay'} onSelect={mode==='select'?selectWall:undefined}/>
 </div>
}

export function ImpactFindingsMainView() {
  const {state,setFindingsAction,selectEvidence,setSuggestedAction}=useDesignReview()
  const findings = [
    {
      num: 1,
      label: 'DESIGN CHANGE',
      body: 'Mechanical Room East Wall shifted 450 mm east.',
      source: 'SketchUp · NorthRidge_Design_v18',
    },
    {
      num: 2,
      label: 'RELATED COORDINATION COMMENT',
      body: 'MEP Coordinator previously flagged clearance in this area.',
      source: 'Trimble Connect · Alex Morgan comment',
    },
    {
      num: 3,
      label: 'POSSIBLY OUTDATED DRAWING',
      body: 'Drawing A-204 still shows the previous wall position.',
      source: 'ProjectSight · Drawing A-204',
    },
    {
      num: 4,
      label: 'OPEN RFI',
      body: 'RFI-087 discusses minimum service clearance in the same area.',
      source: 'ProjectSight · RFI-087',
    },
  ]

  const visibleFindings=findings.filter(f=>state.selectedSources.includes(f.num===1?'sketchup':f.num===2?'trimbleConnect':'projectSight'))
  return (
    <div className="dr-findings p-6 lg:p-8">
      <div className="flex flex-wrap items-start gap-3">
        <span className="text-amber-500"><AlertTriangle/></span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-[var(--ps-text)]">{visibleFindings.length?'Coordination impact detected':'No matching evidence found'}</h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--ps-muted)]">
            The mechanical-room wall shift may affect the currently documented MEP service clearance.
          </p>
          <p className="mt-2 text-xs text-[var(--ps-muted)]">
            <span className="mr-2 inline-flex rounded-full bg-[#dcfce7] px-2 py-0.5 font-semibold text-[#166534]">
              Confidence: {state.selectedSources.includes('sketchup')&&state.selectedSources.includes('trimbleConnect')&&state.selectedSources.includes('projectSight')?'High':'Limited scope'}
            </span>
            Based on {visibleFindings.length} connected evidence records.
          </p>
        </div>
      </div>
      {visibleFindings.length===0&&<p>No matching evidence was found in the selected document sources. Choose model, comment, or ProjectSight sources to investigate.</p>}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {visibleFindings.map((f) => (
          <div key={f.num} className="dr-finding-card">
            <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--ps-active-bg)] text-[11px] font-bold text-[var(--ps-brand)]">
              {f.num}
            </span>
            <p className="dr-finding-card__label">{f.label}</p>
            <p className="dr-finding-card__body">{f.body}</p>
            <button type="button" className="dr-source-link" onClick={()=>{if(f.num===1)setSuggestedAction('compare');else if(f.num===2)setSuggestedAction('comments');else {selectEvidence(f.num===3?'drawing':'rfi');setFindingsAction('inspect')}}}>{f.source} ↗</button>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-4 py-3 text-sm text-[#9a3412]">
        <Lightbulb className="inline-block"/> I found evidence of a coordination risk, but final constructability should be verified by the
        project team.
      </div>
    </div>
  )
}
