import { type Building } from '@prisma/client'
import { BuildingType } from '~/util/enums'

type BuildCostAndInfo = { buildCost: number; info?: string }
type EnhancedBuilding = Building & BuildCostAndInfo

function getEnhancedBuildings(
  buildings: Array<Building>,
): Array<EnhancedBuilding> {
  let isTownHallBuilt = true
  if (buildings.length === 0) {
    buildings.push({
      id: -1,
      createdById: '-1',
      type: BuildingType.TOWN_HALL,
      quantity: 0,
      level: 0,
    })
    isTownHallBuilt = false
  }

  if (buildings.length === 1 && isTownHallBuilt) {
    buildings.push({
      id: -2,
      createdById: '-1',
      type: BuildingType.HOUSE,
      quantity: 0,
      level: 0,
    })
    buildings.push({
      id: -3,
      createdById: '-1',
      type: BuildingType.FARM,
      quantity: 0,
      level: 0,
    })
    buildings.push({
      id: -4,
      createdById: '-1',
      type: BuildingType.WAREHOUSE,
      quantity: 0,
      level: 0,
    })
  }

  return buildings.map((building) => {
    return {
      ...building,
      ...getBuildCost(building, buildings),
    }
  })
}

function getBuildCost(
  building: Building,
  buildings: Array<Building>,
): BuildCostAndInfo {
  switch (building.type as BuildingType) {
    case BuildingType.TOWN_HALL:
      return building.quantity === 0
        ? { buildCost: 100 }
        : { buildCost: -1, info: 'Town hall already built' }
    case BuildingType.HOUSE:
      return { buildCost: Math.pow(1.25, building.quantity) * 100 }
    case BuildingType.FARM:
      return (buildings.find(
        (building) => (building.type as BuildingType) === BuildingType.HOUSE,
      )?.quantity ?? -1) > building.quantity
        ? { buildCost: Math.pow(1.3, building.quantity) * 100 }
        : { buildCost: -1, info: 'Build more houses' }
    case BuildingType.WAREHOUSE:
      return { buildCost: Math.pow(1.5, building.quantity) * 150 }
    default:
      return { buildCost: -1 }
  }
}

export { getEnhancedBuildings }
export type { EnhancedBuilding }
