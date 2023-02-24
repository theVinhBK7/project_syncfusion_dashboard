import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { getListAudio } from '../apis/api';

const AudioList = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [audioData, setAudioData] = useState([]);
  const audioGrid = [
    { type: 'checkbox', width: '50' },
    { field: 'path',
    headerText: 'File',
    width: '150',
    textAlign: 'Center' },
      { field: 'duration',
      headerText: 'Duration',
      width: '150',
      textAlign: 'Center' },
      { field: 'update_at',
      headerText: 'Upload Date',
      width: '150',
      textAlign: 'Center' },
      { field: 'content',
      headerText: 'Content',
      width: '150',
      textAlign: 'Center' }
  ];

  const initListAudio = () => {
    const token = localStorage.getItem("accessToken");
    getListAudio({token:token}).then(
      response => {
        setAudioData(response.data);
      }
    )
  }

  useEffect(() => {
    initListAudio();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Audio List" />
      <GridComponent
        dataSource={audioData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {audioGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default AudioList;
