'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import './Report.scss';
import { Loader } from '@/components/Loader/Loader';

export interface ReportParams {
  params: { id: string };
}

export default function Report({ params }: ReportParams) {
  const [expandedMetric, setExpandedMetric] = useState<string | false>(false);
  const [expandedTask, setExpandedTask] = useState<string | false>(false);
  const { isPending, error, data } = useQuery({
    queryKey: ['report'],
    queryFn: () =>
      fetch('/getReport/' + params.id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()),
  });

  if (isPending) {
    return (
        <Box
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{
                width: '100%',
                height: '98vh',
                padding: '30px'
            }}
        >
            <Box sx={{width: '40%'}}>
                <Loader/>
            </Box>
            <Box className="container-image"></Box>
        </Box>
    );
  }

    if (error) {
        window.location.href = '/report/' + params.id;
  }

  const handleChangeMetric =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedMetric(isExpanded ? panel : false);
    };

    const handleChangeTask =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedTask(isExpanded ? panel : false);
        };

  const metricsKeys = Object.keys(data.metrics);
  const performanceKeys = Object.keys(data.performance);
  return (
    <Box className="report-container">
      <Box className="report-block">
        <Box className="report-block-title">Performance Scores</Box>
        <Box className="performance-metrics">
          {performanceKeys.map((performance) => {
            return (
              <Card key={performance} className="performance-card">
                <CardContent
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    className="performance-score"
                    sx={{
                      color:
                        data.performance[performance] < 50
                          ? 'hsla(11,100%,52.2%,1)'
                          : data.performance[performance] < 80
                            ? 'hsla(39,100%,68%,1)'
                            : 'hsl(148.09deg 51.4% 51.6%)',
                    }}
                  >
                    {data.performance[performance]}
                  </Box>
                  <Box className="performance-name">
                    {performance.toUpperCase()}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Box className="report-block">
        <Box className="report-block-title">Web Vitals Metrics</Box>
        <Box className="main-metrics">
          {metricsKeys.map((metric) => {
            return (
              <Accordion
                key={metric}
                expanded={expandedMetric === metric}
                onChange={handleChangeMetric(metric)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${metric}-content`}
                  id={`${metric}-header`}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {metric}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {data.metrics[metric]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>metric description</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Box>
        <Box className="report-block">
            <Box className="report-block-title">Tasks</Box>
            <Box className="main-metrics">
                {data.audits.map((task: {message: string; estimation: string; recommendation: string; }, index: number) => {
                    return (
                        <Accordion
                            key={task.recommendation}
                            expanded={expandedTask === `${index}`}
                            onChange={handleChangeTask(`${index}`)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${index}-content`}
                                id={`${index}-header`}
                            >
                                <Typography sx={{ width: '40%', flexShrink: 0 }}>
                                    {task.message}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    {task.estimation}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{task.recommendation}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </Box>
      <Box className="report-block">
        <Box className="report-block-title">Revenue Savings</Box>
      </Box>
    </Box>
  );
}
