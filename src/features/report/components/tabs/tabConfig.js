import OverviewTab from './OverviewTab';
import MilestonesTab from './MilestonesTab';
import PatternsTab from './PatternsTab';
import MemosTab from './MemosTab';

export const tabs = [
    {
        id: 0,
        label: "Overview",
        component: OverviewTab
    },
    {
        id: 1,
        label: "Milestones",
        component: MilestonesTab
    },
    {
        id: 2,
        label: "Patterns",
        component: PatternsTab
    },
    {
        id: 3,
        label: "Memos",
        component: MemosTab
    }
];