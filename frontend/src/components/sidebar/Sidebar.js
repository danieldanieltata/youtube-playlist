import { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import './Sidebar.css';

function Sidebar(props) {
    let [videoInput, setVideoInput] = useState('');

    function onAddClicked() {
        if (!videoInput) {
            return;
        }
        
        const videoId = videoInput.split('v=')[1];
        props.onAddClickedEvent({ url: videoInput, videoId });

        setVideoInput('');
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            onAddClicked();
        }
    }

    function onDeleteClicked(item) {
        props.onDeleteClicked(item);
    }

    return (
        <div className='sidebar-container'>
            <div className='action-section-container'>
                <input
                    className='search-bar'
                    type='text'
                    placeholder='Enter video id'
                    value={videoInput}
                    onChange={(e) => { setVideoInput(e.target.value); }}
                    onKeyDown={handleKeyDown} />
                <Button variant="primary" onClick={onAddClicked}>Add</Button>
            </div>

            <ListGroup className='list-group' as="ol" numbered>
                {
                    props.list.map((item, index) => {
                        return <ListGroup.Item key={item.id} as="li" active={index === 0} className="d-flex justify-content-between align-items-start list-group-item">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold url-text">{item.url}</div>
                            </div>
                            <Button variant='danger' title='Remove from list' onClick={() => { onDeleteClicked(item) }}>
                                <i className="bi bi-x-lg remove-button"></i>
                            </Button>
                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Sidebar;
