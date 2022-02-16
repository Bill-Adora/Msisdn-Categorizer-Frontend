import React from 'react';

const ListItem = ({listNumber, list_item_content}) => (
    <div className='row'>
        <div className='col-sm'>{listNumber}</div>
        <div className='col-sm'>{list_item_content.country}</div>
        <div className='col-sm'>{list_item_content.state}</div>
        <div className='col-sm'>{list_item_content.countryCode}</div>
        <div className='col-sm'>{list_item_content.phoneNumber}</div>
    </div>
);

export default ListItem;