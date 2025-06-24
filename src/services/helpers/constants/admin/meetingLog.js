import React from 'react'
import { color } from 'services/colors'

export const fieldLabels = {
  typeOfMeeting: 'Type of Meeting',
  modeOfMeeting: 'Mode of Meeting',
  clientName: 'Client Name',
  stakeholder: 'Stakeholder',
  date: 'Date',
  overallPulse: 'Overall Pulse',
  timeline: 'Timeline',
  communication: 'Communication',
  deliveryQuality: 'Delivery Quality',
  escalationStatus: 'Escalation Status',
  impactOfMeeting: 'Impact Of Meeting',
  agOpportunityNotes: 'Ag Opportunity Note',
  agOpportunity: 'Ag Opportunity',
  contractVisibility: 'Contract Visibility',
  xplusRecommendation: 'X-plus Recommendation',
  relationshipstakeholder: 'Stakeholder',
  stakeholders: 'Stakeholder',
  clientEmailInformationStakeholders: 'Stakeholder',
  comments: 'Comments',
  subject: 'Subject',
  emailContent: 'Email Content',
}

export const baseRequiredFields = [
  'clientName',
  'modeOfMeeting',
  'typeOfMeeting',
  'date',
  'timeline',
  'communication',
  'deliveryQuality',
  'escalationStatus',
  'contractVisibility',
  'agOpportunity',
  // 'impactOfMeeting',
  'relationshipstakeholder',
  'xplusRecommendation',
  // 'comments',
]
export const baseRequiredFields2 = [
  'clientName',
  'modeOfMeeting',
  'typeOfMeeting',
  'date',
  'timeline',
  'communication',
  'deliveryQuality',
  'escalationStatus',
  'contractVisibility',
  'agOpportunity',
  // 'impactOfMeeting',
  // 'relationshipstakeholder',
  'xplusRecommendation',
  // 'comments',
]

export const getFieldLabel = (name) => {
  switch (name) {
    case 'typeOfMeeting':
      return 'Type of Meeting'
    case 'modeOfMeeting':
      return 'Mode of Meeting'
    case 'clientName':
      return 'Client Name'
    case 'date':
      return 'Date'
    case 'timeline':
      return 'Timeline'
    case 'communication':
      return 'Communication'
    case 'deliveryQuality':
      return 'Delivery Quality'
    case 'escalationStatus':
      return 'Escalation Status'
    case 'contractVisibility':
      return 'Contract Visibility'
    case 'agOpportunity':
      return 'AG Opportunity'
    case 'relationshipstakeholder':
      return 'Stakeholder'
    case 'xplusRecommendation':
      return 'X-plus Recommendation'
    case 'comments':
      return 'Comments'
    case 'emailContent':
      return 'Email Content'
    case 'subject':
      return 'Subject'
    case 'stakeholders':
      return 'Stakeholder'
    case 'clientEmailInformationStakeholders':
      return 'Stakeholder'
    default:
      return 'Field'
  }
}

export const clientMeetHeader = [
  // { label: 'Client Name', sort: true, key: 'clientName' },
  // { label: 'Meeting Date' },
  // { label: 'Type of Meeting' },
  // { label: 'Mode of Meeting' },
  // { label: 'BU' },
  // { label: 'SC' },
  // { label: 'Movement' },
  { id: "id", label: "Task ID", sort: true },
  { id: "title", label: "Title", sort: true },
  { id: "assignedTo", label: "Assigned To", sort: false },
  { id: "location", label: "Location", sort: false },
  { id: "status", label: "Status", sort: true },
  { id: "due", label: "Due Date", sort: true },
];

export const clientMeetList = [
  {
    name: 'Mont Surface',
    location: 'USA',
    meetingDate: '2024-08-28',
    typeOfMeeting: 'Internal',
    modeOfMeeting: 'Online',
    bu: 'BU1',
    sc: 'SC1',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
    ],
  },
  {
    name: 'PickleZone',
    location: 'Bangalore',
    meetingDate: '2024-08-29',
    typeOfMeeting: 'External',
    modeOfMeeting: 'Offline',
    bu: 'BU2',
    sc: 'SC2',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
      {
        label: 'Relationship',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
    ],
  },
  {
    name: 'Limitless',
    location: 'Chennai',
    meetingDate: '2024-08-30',
    typeOfMeeting: 'Internal',
    modeOfMeeting: 'Online',
    bu: 'BU3',
    sc: 'SC3',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
    ],
  },
  {
    name: 'Oceanic Minds',
    location: 'Mumbai',
    meetingDate: '2024-09-01',
    typeOfMeeting: 'External',
    modeOfMeeting: 'Offline',
    bu: 'BU4',
    sc: 'SC4',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
    ],
  },
  {
    name: 'TechWave',
    location: 'San Francisco',
    meetingDate: '2024-09-02',
    typeOfMeeting: 'Internal',
    modeOfMeeting: 'Online',
    bu: 'BU5',
    sc: 'SC5',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
    ],
  },
  {
    name: 'Quantum Leap',
    location: 'New York',
    meetingDate: '2024-09-03',
    typeOfMeeting: 'External',
    modeOfMeeting: 'Offline',
    bu: 'BU6',
    sc: 'SC6',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
      {
        label: 'Relationship',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
    ],
  },
  {
    name: 'Innovatech',
    location: 'Berlin',
    meetingDate: '2024-09-04',
    typeOfMeeting: 'Internal',
    modeOfMeeting: 'Online',
    bu: 'BU7',
    sc: 'SC7',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
    ],
  },
  {
    name: 'BrightFuture',
    location: 'Tokyo',
    meetingDate: '2024-09-05',
    typeOfMeeting: 'External',
    modeOfMeeting: 'Offline',
    bu: 'BU8',
    sc: 'SC8',
    objective: [
      {
        label: 'Pulse',
        iconColor: '#EB5757',
        movement: 'Downward',
      },
      {
        label: 'Revenue Impact',
        iconColor: '#27AE60',
        movement: 'Upward',
      },
      {
        label: 'Relationship',
        iconColor: '#F2C94C',
        movement: 'Upward',
      },
    ],
  },
]

export const accountList = [
  { label: 'Account' },
  { label: 'SC' },
  { label: 'Client Pulse' },
]

export const accountListResponse = [
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
  {
    name: 'Meradoc',
    location: 'SC A',
    objective: [
      {
        label: 'Pulse',
        iconName: 'bolt',
        iconColor: `${color.dataVisualisation.shade3['100']}`,
      },
    ],
  },
]

export const meetingTypeOptions = [
  { label: 'Governance', value: 'Governance' },
  { label: 'Escalation', value: 'Escalation' },
  { label: 'AG Discussion', value: 'Ag discussion' },
  { label: 'Workshop', value: 'Workshop' },
  { label: 'Ad-hoc Relationship Check', value: 'Ad-hoc Relationship Check' },
  { label: 'Kick off Meeting', value: 'Kick off Meeting' },
]

export const modeOfMeetingOptions = [
  { label: 'Face to Face', value: 'Face to Face' },
  { label: 'Virtual', value: 'Virtual' },
  { label: 'Events', value: 'Events' },
]

export const DeliveryCsclientMeetHeader = [
  { label: 'Meeting Date' },
  { label: 'Type of Meeting' },
  { label: 'Mode of Meeting' },
  { label: 'Stakeholder' },
  { label: 'Delivery' },
  { label: 'Client Pulse' },
  { label: 'Relationship' },
  { label: 'Contract update' },
  // { label: 'Movement' },
  {
    label: (
      <>
        <span>
          Movement
          <br />
          <span style={{ fontSize: '0.7em' }}>
            (P: Pulse, RI: Revenue Impact,
          </span>
          <br />
          <span style={{ fontSize: '0.7em' }}>R: Relationship)</span>
        </span>
      </>
    ),
  },
]
