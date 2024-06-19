'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Divider,
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
          padding: '30px',
        }}
      >
        <Box
          display="flex"
          sx={{
            width: '40%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box className="container-image"></Box>
        </Box>
        <Box sx={{ width: '40%' }}>
          <Loader />
        </Box>
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

  return (
    <Box className="report-container">
      <Box className="report-block">
        <Box className="report-block-title">Site info</Box>
        <Card className="report-site-info">
          <CardContent>
            <Typography className="option">
              <b>Site URL: </b> {data.options.url}
            </Typography>
            <Divider />
            <Typography className="option">
              <b>Visitors per month: </b> {data.options.visitors}
            </Typography>
            <Divider />
            <Typography className="option">
              <b>Page views per visit: </b> {data.options.views}
            </Typography>
            <Divider />
            <Typography className="option">
              <b>Ads per page: </b> {data.options.ads}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box className="report-block">
        <Box className="report-block-title">Revenue Savings</Box>
        <Box className="money-metrics">
          {data.money.map(
            (metric: { name: string; value: number }, index: number) => {
              return (
                <Card key={index} className="money-card">
                  <CardContent
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Box className="money-score">{metric.value}</Box>
                    <Box className="performance-name">
                      {metric.name.toUpperCase()}
                    </Box>
                  </CardContent>
                </Card>
              );
            },
          )}
        </Box>
      </Box>
      <Box className="performance-wrapper">
        <Box className="report-block performance-item">
          <Box className="report-block-title">Performance Scores</Box>
          <Box className="performance-metrics">
            {data.performanceScores.map(
              (metric: { name: string; value: number }, index: number) => {
                return (
                  <Card key={index} className="performance-card">
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
                            Number(metric.value) < 50
                              ? 'hsla(11,100%,52.2%,1)'
                              : Number(metric.value) < 80
                                ? 'hsla(39,100%,68%,1)'
                                : 'hsl(148.09deg 51.4% 51.6%)',
                        }}
                      >
                        {metric.value}
                      </Box>
                      <Box className="performance-name">
                        {metric.name.toUpperCase()}
                      </Box>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </Box>
        </Box>
        <Box className="report-block performance-item">
          <Box className="report-block-title">Performance Metrics</Box>
          <Box className="main-metrics">
            {data.vitalsMetrics.map(
              (
                metric: {
                  name: string;
                  value: number;
                  description: string;
                  color: string;
                },
                index: number,
              ) => {
                return (
                  <Accordion
                    key={index}
                    expanded={expandedMetric === `${index}`}
                    onChange={handleChangeMetric(`${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${index}-content`}
                      id={`${index}-header`}
                    >
                      <Typography sx={{ width: '60%', flexShrink: 0 }}>
                        {metric.name}
                      </Typography>
                      <Typography sx={{ color: metric.color }}>
                        {metric.value}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{metric.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              },
            )}
          </Box>
        </Box>
      </Box>
      <Box className="report-block">
        <Box className="report-block-title">Tasks</Box>
        <Box className="main-metrics">
          {data.audits.map(
            (
              task: {
                message: string;
                estimation: string;
                recommendation: string;
              },
              index: number,
            ) => {
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
                    <Typography sx={{ width: '60%', flexShrink: 0 }}>
                      {task.message}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {task.estimation}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {task.recommendation
                        .replaceAll(':', '')
                        .split('**')
                        .filter((i) => i !== '')
                        .map((item, index) => {
                          if (!(index % 2)) {
                            return <h3 key={index}>{item}</h3>;
                          }
                          return <Typography key={index}>{item}</Typography>;
                        })}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            },
          )}
        </Box>
      </Box>
    </Box>
  );
}
