/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { RootSchema } from '@kbn/analytics-client';

export const fleetUsagesSchema: RootSchema<any> = {
  agents_enabled: { type: 'boolean', _meta: { description: 'agents enabled' } },
  agents: {
    properties: {
      total_enrolled: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled agents, in any state',
        },
      },
      healthy: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled agents in a healthy state',
        },
      },
      unhealthy: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled agents in an unhealthy state',
        },
      },
      updating: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled agents in an updating state',
        },
      },
      offline: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled agents currently offline',
        },
      },
      total_all_statuses: {
        type: 'long',
        _meta: {
          description: 'The total number of agents in any state, both enrolled and inactive',
        },
      },
    },
  },
  fleet_server: {
    properties: {
      total_enrolled: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled Fleet Server agents, in any state',
        },
      },
      total_all_statuses: {
        type: 'long',
        _meta: {
          description:
            'The total number of Fleet Server agents in any state, both enrolled and inactive.',
        },
      },
      healthy: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled Fleet Server agents in a healthy state.',
        },
      },
      unhealthy: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled Fleet Server agents in an unhealthy state',
        },
      },
      updating: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled Fleet Server agents in an updating state',
        },
      },
      offline: {
        type: 'long',
        _meta: {
          description: 'The total number of enrolled Fleet Server agents currently offline',
        },
      },
      num_host_urls: {
        type: 'long',
        _meta: {
          description: 'The number of Fleet Server hosts configured in Fleet settings.',
        },
      },
    },
  },
  packages: {
    type: 'array',
    items: {
      properties: {
        name: { type: 'keyword' },
        version: { type: 'keyword' },
        enabled: { type: 'boolean' },
      },
    },
  },
  agents_per_version: {
    type: 'array',
    items: {
      properties: {
        version: { type: 'keyword' },
        count: { type: 'long' },
      },
    },
  },
  agents_per_policy: {
    type: 'array',
    items: {
      type: 'long',
      _meta: { description: 'Agent counts enrolled per agent policy.' },
    },
  },
  fleet_server_config: {
    properties: {
      policies: {
        type: 'array',
        items: {
          properties: {
            input_config: { type: 'pass_through' },
          },
        },
      },
    },
  },
  agent_policies: {
    properties: {
      count: {
        type: 'long',
        _meta: {
          description: 'Number of agent policies',
        },
      },
      output_types: {
        type: 'array',
        items: {
          type: 'keyword',
          _meta: { description: 'Output types of agent policies' },
        },
      },
    },
  },
  agent_checkin_status: {
    properties: {
      error: {
        type: 'long',
        _meta: {
          description: 'Count of agent last checkin status error',
        },
      },
      degraded: {
        type: 'long',
        _meta: {
          description: 'Count of agent last checkin status degraded',
        },
      },
    },
  },
  agent_logs_top_errors: {
    type: 'array',
    items: {
      type: 'text',
      _meta: { description: 'Top messages from agent error logs' },
    },
  },
  fleet_server_logs_top_errors: {
    type: 'array',
    items: {
      type: 'text',
      _meta: { description: 'Top messages from fleet server error logs' },
    },
  },
};
