import "./Main.css";
import Markdown from 'react-markdown'

export const Main = ({ activeNote, setActiveNote, onUpdateNote }) => {
  const onEditNote = (key, value) => {
    const newActiveNote = {
      ...activeNote,
      [key]: value,
      modDate: Date.now()
    }
    onUpdateNote(newActiveNote)
    setActiveNote(newActiveNote);
  }


  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません。</div>
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input id="title" type="text" value={activeNote.title} onChange={e => onEditNote('title', e.target.value)} />
        <textarea id="content" placeholder="内容がないよ" value={activeNote.content} onChange={e => onEditNote('content', e.target.value)}></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">
          <Markdown>
            {activeNote.content}
          </Markdown>
        </div>
      </div>
    </div>

  )
}
