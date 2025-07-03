"use client"
import React from 'react';
import StepPage from './components/StepPage';

const Page = () => {
  const [mounted,setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    },2*1000)
  },[])
  if(!mounted) return null;
  return (
    <StepPage />
  );
};

export default Page;