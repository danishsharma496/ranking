import React from 'react';
import { Card as AntdCard, Progress } from 'antd'; // Assuming you're using Ant Design

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const DashboardCard = ({ title, percent }) => {
  return (
    <AntdCard style={{ width: '25%', marginBottom: 2, border: 0 }}>
      <AntdCard.Meta title={title} />
      <Progress type="line" percent={ Math.ceil(percent * 10)} strokeColor={twoColors} />
    </AntdCard>
  );
};

 

const Card = ({ username, image, atr, trw, cr, fol  , eng , rank }) => {
  const { Meta } = AntdCard;

  return (
    <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noopener noreferrer">
      <AntdCard
        hoverable
        style={{ width: '100%', marginLeft: '10%', marginBottom: 16, height: '300px' }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ width: '800px', height:'200px' }}>
            <AntdCard 
              style={{ height: '150px' }}
              cover={<img alt="example" src={image} style={{ width: '300px', height: '150px' }} />}
            >
              <Meta title={username} description={rank + " | " + eng} />
            </AntdCard>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <DashboardCard title="Attractive" percent={atr} />
            <DashboardCard title="Trustworthy" percent={trw} />
            <DashboardCard title="Content Relv." percent={cr} />
            <DashboardCard title="Followers" percent={fol} />
          </div>
        </div>
      </AntdCard>
    </a>
  );
  
};

export default Card;
