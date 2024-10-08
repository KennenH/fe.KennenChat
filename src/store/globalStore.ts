import { types, flow } from "mobx-state-tree";
import localforage from "localforage";

/**
 * 全局配置
 */
const GlobalStore = types
  .model({
    /**
     * 暗黑模式
     */
    isDarkMode: types.optional(types.boolean, true),

    /**
     * 是否使用虚拟列表
     */
    isUseVirtualList: types.optional(types.boolean, true),

    /**
     * 前置预加载消息数量
     */
    virtualListPreLoad: types.optional(types.integer, 3),

    /**
     * 后置预加载消息数量
     */
    virtualListPostLoad: types.optional(types.integer, 3),

    /**
     * 是否使用流式输出
     */
    isUseStream: types.optional(types.boolean, true),

    /**
     * 温度
     */
    temperature: types.optional(types.number, 0.9),

    /**
     * 多样性
     */
    top_p: types.optional(types.number, 0.7),

    /**
     * 惩罚因子
     */
    penalty_score: types.optional(types.number, 1.0),

    /**
     * ai 静音
     */
    isMuteAssistant: types.optional(types.boolean, false),

    /**
     * 是否解析 markdown
     */
    isParseMarkdown: types.optional(types.boolean, true),

    /**
     * 若是，则后续的新的聊天将生成一个具有 10000 条消息的聊天
     */
    isMockingData: types.optional(types.boolean, false),

    /**
     * mock data 数量
     */
    mockDataNum: types.optional(types.integer, 10000),

    /**
     * mock data 类型
     * s：简单类型 10000 个左右可使非虚拟列表卡死，默认
     * c：复杂类型
     */
    mockDataType: types.optional(types.string, 's'),
  })
  .actions((self) => ({
    setDarkMode(value: boolean) {
      self.isDarkMode = value;
    },
    switchVirtualList(virtual: boolean) {
      self.isUseVirtualList = virtual;
    },
    setPreLoadNum(preload: number) {
      self.virtualListPreLoad = preload;
    },
    setPostLoadNum(postload: number) {
      self.virtualListPostLoad = postload;
    },
    shouldMuteAssistant(mute: boolean) {
      self.isMuteAssistant = mute;
    },
    shouldParseMarkdown(parse: boolean) {
      self.isParseMarkdown = parse;
    },
    shouldUseStream(stream: boolean) {
      self.isUseStream = stream;
    },
    setTemperature(t: number) {
      self.temperature = t;
    },
    setTopP(tp: number) { 
      self.top_p = tp;
    },
    setPenaltyScore(score: number) {
      self.penalty_score = score;
    },
    setIsMockingData(mock: boolean) {
      self.isMockingData = mock;
    },
    setMockDataNum(num: number) {
      self.mockDataNum = num;
    },
    setMockDataType(t: string) {
      self.mockDataType = t;
    },
    loadConfigFromStorage: flow(function* () {
      const config = yield localforage.getItem("appConfig");
      if (config) {
        self.isDarkMode = config.isDarkMode;
        self.isUseVirtualList = config.isUseVirtualList;
        self.virtualListPreLoad = config.virtualListPreLoad
        self.isMuteAssistant = config.isMuteAssistant;
        self.isParseMarkdown = config.isParseMarkdown;
        self.isUseStream = config.isUseStream;
        self.temperature = config.temperature;
        self.top_p = config.top_p;
        self.penalty_score = config.penalty_score;
        self.isMockingData = config.isMockingData
        self.mockDataType = config.mockDataType
      }
    }),
  }));

const globalStore = GlobalStore.create({});

globalStore.loadConfigFromStorage();

export default globalStore;