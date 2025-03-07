/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { noop } from 'lodash/fp';
import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import type { Filter } from '@kbn/es-query';
import type { ColumnHeaderOptions } from '../../../../common/types';
import { allowTopN } from '../../components/drag_and_drop/helpers';
import { ShowTopNButton } from '../../components/hover_actions/actions/show_top_n';
import { useKibana } from '../kibana';
import { SHOW_TOP_VALUES, HIDE_TOP_VALUES } from './translations';

interface Props {
  field: ColumnHeaderOptions;
  globalFilters?: Filter[];
  scopeId: string;
  value: string[] | undefined;
  onFilterAdded?: () => void;
  closeCellPopover?: () => void;
}

const StyledFlexGroup = styled(EuiFlexGroup)`
  border-top: 1px solid #d3dae6;
  border-bottom: 1px solid #d3dae6;
  margin-top: 2px;
`;

export const StyledContent = styled.div<{ $isDetails: boolean }>`
  padding: ${({ $isDetails }) => ($isDetails ? '0 8px' : undefined)};
`;

const ExpandedCellValueActionsComponent: React.FC<Props> = ({
  field,
  globalFilters,
  onFilterAdded,
  scopeId,
  value,
  closeCellPopover,
}) => {
  const {
    timelines,
    data: {
      query: { filterManager },
    },
  } = useKibana().services;
  const showButton = useMemo(
    () =>
      allowTopN({
        fieldName: field.id,
        fieldType: field.type ?? '',
        isAggregatable: field.aggregatable ?? false,
        hideTopN: false,
      }),
    [field]
  );

  const [showTopN, setShowTopN] = useState(false);
  const onClick = useCallback(() => setShowTopN(!showTopN), [showTopN]);

  return (
    <>
      <StyledContent $isDetails data-test-subj="data-grid-expanded-cell-value-actions">
        {showButton ? (
          <ShowTopNButton
            className="eui-displayBlock expandable-top-value-button"
            Component={EuiButtonEmpty}
            data-test-subj="data-grid-expanded-show-top-n"
            field={field.id}
            flush="both"
            globalFilters={globalFilters}
            iconSide="right"
            iconType={showTopN ? 'arrowUp' : 'arrowDown'}
            isExpandable
            onClick={onClick}
            onFilterAdded={onFilterAdded ?? noop}
            ownFocus={false}
            paddingSize="none"
            showLegend
            showTopN={showTopN}
            showTooltip={false}
            scopeId={scopeId}
            title={showTopN ? HIDE_TOP_VALUES : SHOW_TOP_VALUES}
            value={value}
          />
        ) : null}
      </StyledContent>
      <StyledFlexGroup gutterSize="s">
        <EuiFlexItem>
          {timelines.getHoverActions().getFilterForValueButton({
            Component: EuiButtonEmpty,
            field: field.id,
            filterManager,
            onFilterAdded,
            ownFocus: false,
            size: 's',
            showTooltip: false,
            value,
            onClick: closeCellPopover,
          })}
        </EuiFlexItem>
        <EuiFlexItem>
          {timelines.getHoverActions().getFilterOutValueButton({
            Component: EuiButtonEmpty,
            field: field.id,
            filterManager,
            onFilterAdded,
            ownFocus: false,
            size: 's',
            showTooltip: false,
            value,
            onClick: closeCellPopover,
          })}
        </EuiFlexItem>
      </StyledFlexGroup>
    </>
  );
};

ExpandedCellValueActionsComponent.displayName = 'ExpandedCellValueActionsComponent';

export const ExpandedCellValueActions = React.memo(ExpandedCellValueActionsComponent);
