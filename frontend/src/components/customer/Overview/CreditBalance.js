import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import './Overview.css';

export default function CreditBalance(props) {
  return (
    <React.Fragment>
      <div className="textCenter">
        <Title>Credit Balance Amount</Title>
        <Typography component="p" variant="h4">
          ${props.balance}
        </Typography>
      </div>
    </React.Fragment>
  );
}